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
import { GetNftsQuery_getNfts, PlaceBidMutation, PlaceBidMutationVariables } from '../graphql-types';
import { GET_NFTS_QUERY } from './nfts.context';

const PLACE_BID_MUTATION = gql`
  mutation PlaceBidMutation($nftId: String!, $value: Float!) {
    placeBid(nft: $nftId, value: $value) {
      _id
    }
  }
`;

export type PlaceBidState = {
  nft?: GetNftsQuery_getNfts;
  value?: number;
  placingBid: boolean;
  error?: ApolloError;
};

const DEFAULT_STATE: PlaceBidState = { placingBid: false };

export type PlaceBidContextState = PlaceBidState & {
  setNft: (nft: GetNftsQuery_getNfts | undefined) => void;
  setValue: (value: number) => void;
  placeBid: () => void;
};

export const PlaceBidContext = createContext({} as PlaceBidContextState);

export const usePlaceBid = () => useContext(PlaceBidContext);

const usePlaceBidMutation = (
  { nft, value }: PlaceBidState,
  setState: Dispatch<SetStateAction<PlaceBidState>>
): Pick<PlaceBidContextState, 'placeBid' | 'placingBid' | 'error'> => {
  const [callPlaceBidMutation, { loading, error }] = useMutation<PlaceBidMutation, PlaceBidMutationVariables>(
    PLACE_BID_MUTATION,
    { refetchQueries: [GET_NFTS_QUERY] }
  );
  const placeBid = useCallback(async () => {
    if (!nft || !value) return;
    setState((prev) => ({ ...prev, placingBid: true }));
    await callPlaceBidMutation({ variables: { nftId: nft._id, value } });
    setState(DEFAULT_STATE);
  }, [callPlaceBidMutation, nft, setState, value]);
  return { placeBid, placingBid: loading, error };
};

const useProvider = (): PlaceBidContextState => {
  const [state, setState] = useState<PlaceBidState>(DEFAULT_STATE);
  const setNft = useCallback(
    (nft: GetNftsQuery_getNfts | undefined) => setState({ ...DEFAULT_STATE, nft }),
    []
  );
  const setValue = useCallback((value: number) => setState((prev) => ({ ...prev, value })), []);
  return { ...state, setNft, setValue, ...usePlaceBidMutation(state, setState) };
};

export const PlaceBidProvider = ({ children }: PropsWithChildren<{}>) => (
  <PlaceBidContext.Provider value={useProvider()}>{children}</PlaceBidContext.Provider>
);
