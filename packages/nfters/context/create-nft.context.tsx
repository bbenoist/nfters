import { ApolloError, gql, useMutation } from '@apollo/client';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react';
import { DateTime } from 'luxon';
import {
  Category,
  CreateNftMutation,
  CreateNftMutationVariables,
  GetSignedUploadUrl
} from '../graphql-types';
import { useWallet } from './wallet';
import { GET_NFTS_QUERY } from './nfts.context';

export type CreateNftState = {
  title: string;
  imageUrl?: string;
  category: Category;
  startingPrice?: number;
  end: Date;
  uploadingImage: boolean;
  creatingNft: boolean;
  errors?: readonly (ApolloError | Error)[];
  displayModal: boolean;
  nftCreated: boolean;
};

const DEFAULT_STATE: CreateNftState = {
  uploadingImage: false,
  creatingNft: false,
  errors: undefined,
  title: '',
  imageUrl: undefined,
  startingPrice: undefined,
  end: DateTime.now().plus({ days: 7 }).toJSDate(),
  category: Object.values(Category)[0],
  displayModal: false,
  nftCreated: false
};

export type CreateNftContextState = CreateNftState & {
  canCreateNft: boolean;
  setTitle: (value: string) => void;
  setStartingPrice: (value: number | undefined) => void;
  setEnd: (value: Date) => void;
  setCategory: (category: Category) => void;
  openModal: () => void;
  closeModal: () => void;
  uploadImage: (file: File) => Promise<void>;
  clearImage: () => void;
  createNft: () => Promise<void>;
};

const CreateNftContext = createContext({} as CreateNftContextState);

export const useCreateNft = () => useContext(CreateNftContext);

const GET_SIGNED_UPLOAD_URL_MUTATION = gql`
  mutation GetSignedUploadUrl {
    getSignedUploadUrl {
      uploadUrl
      downloadUrl
    }
  }
`;

const CREATE_NFT_MUTATION = gql`
  mutation CreateNftMutation($data: CreateNftInput!) {
    createNft(data: $data) {
      _id
    }
  }
`;

const useUpload = (
  { uploadingImage, creatingNft }: CreateNftState,
  setState: Dispatch<SetStateAction<CreateNftState>>
): Pick<CreateNftContextState, 'uploadImage'> => {
  const [getUploadUrl] = useMutation<GetSignedUploadUrl>(GET_SIGNED_UPLOAD_URL_MUTATION);
  const uploadImage = useCallback(
    async (file: File) => {
      if (uploadingImage || creatingNft) return;
      setState((prev) => ({ ...prev, errors: undefined, uploadingImage: true }));
      const { data, errors: uploadErrors } = await getUploadUrl();
      if (data == null || (uploadErrors?.length ?? 0) > 0) {
        setState((prev) => ({ ...prev, uploadingImage: false, errors: uploadErrors }));
        return;
      }
      const { uploadUrl, downloadUrl } = data.getSignedUploadUrl;
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/*' },
        body: await file.arrayBuffer()
      });
      const imageUrl = response.ok ? downloadUrl : undefined;
      const errors = response.ok ? undefined : [new Error(`Could not upload image: ${response.statusText}`)];
      setState((prev) => ({ ...prev, uploadingImage: false, errors, imageUrl }));
    },
    [uploadingImage, creatingNft, setState, getUploadUrl]
  );
  return { uploadImage };
};

const useClearImage = (
  { imageUrl, uploadingImage, creatingNft }: CreateNftState,
  setState: Dispatch<SetStateAction<CreateNftState>>
): Pick<CreateNftContextState, 'clearImage'> => {
  const clearImage = useCallback(() => {
    if (imageUrl || uploadingImage || creatingNft) return;
    return setState((prev) => ({ ...prev, imageUrl: undefined, errors: undefined }));
  }, [creatingNft, imageUrl, setState, uploadingImage]);
  return { clearImage };
};

const useVariables = (
  setState: Dispatch<SetStateAction<CreateNftState>>
): Pick<CreateNftContextState, 'setTitle' | 'setStartingPrice' | 'setEnd' | 'setCategory'> => {
  const setTitle = useCallback(
    (title: string) => setState((prev) => ({ ...prev, title, errors: undefined })),
    [setState]
  );
  const setStartingPrice = useCallback(
    (startingPrice: number | undefined) =>
      setState((prev) => ({ ...prev, startingPrice, errors: undefined })),
    [setState]
  );
  const setEnd = useCallback(
    (end: Date) => setState((prev) => ({ ...prev, end, errors: undefined })),
    [setState]
  );
  const setCategory = useCallback(
    (category: Category) => setState((prev) => ({ ...prev, category, errors: undefined })),
    [setState]
  );
  return { setTitle, setEnd, setStartingPrice, setCategory };
};

const useCreateNftMutation = (
  { uploadingImage, creatingNft, title, imageUrl, category, startingPrice, end }: CreateNftState,
  setState: Dispatch<SetStateAction<CreateNftState>>
): Pick<CreateNftContextState, 'createNft'> => {
  const [callCreateNftMutation] = useMutation<CreateNftMutation, CreateNftMutationVariables>(
    CREATE_NFT_MUTATION,
    { refetchQueries: [GET_NFTS_QUERY] }
  );
  const { selectedAccount: authorAccount } = useWallet();
  const createNft = useCallback(async () => {
    if (uploadingImage || creatingNft || !imageUrl || !authorAccount) return;
    setState((prev) => ({ ...prev, errors: undefined, creatingNft: true }));
    const { errors } = await callCreateNftMutation({
      variables: {
        data: { title, imageUrl, category, startingPrice, authorAccount, end }
      }
    });
    setState((prev) => ({ ...prev, creatingNft: false, errors, nftCreated: errors == null }));
  }, [
    uploadingImage,
    creatingNft,
    imageUrl,
    authorAccount,
    setState,
    callCreateNftMutation,
    title,
    category,
    startingPrice,
    end
  ]);
  return { createNft };
};

const useModal = (
  { displayModal }: CreateNftState,
  setState: Dispatch<SetStateAction<CreateNftState>>
): Pick<CreateNftContextState, 'openModal' | 'closeModal'> => {
  const openModal = useCallback(() => {
    if (displayModal) return;
    setState({ ...DEFAULT_STATE, displayModal: true });
  }, [displayModal, setState]);
  const closeModal = useCallback(() => {
    if (!displayModal) return;
    setState({ ...DEFAULT_STATE, displayModal: false });
  }, [displayModal, setState]);
  return { openModal, closeModal };
};

const useCanCreateNft = ({
  uploadingImage,
  creatingNft,
  imageUrl
}: CreateNftState): Pick<CreateNftContextState, 'canCreateNft'> => ({
  canCreateNft: !uploadingImage && !creatingNft && imageUrl != null
});

const useProvider = (): CreateNftContextState => {
  const [state, setState] = useState<CreateNftState>(DEFAULT_STATE);
  return {
    ...state,
    ...useUpload(state, setState),
    ...useClearImage(state, setState),
    ...useVariables(setState),
    ...useCreateNftMutation(state, setState),
    ...useModal(state, setState),
    ...useCanCreateNft(state)
  };
};

export const CreateNftProvider = ({ children }: PropsWithChildren<{}>) => (
  <CreateNftContext.Provider value={useProvider()}>{children}</CreateNftContext.Provider>
);
