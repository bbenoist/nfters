import { ApolloError } from '@apollo/client';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  Icon,
  Input,
  InputElementProps,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
  Select
} from '@chakra-ui/react';
import { sentenceCase } from 'change-case';
import { DateTime } from 'luxon';
import { ChangeEvent, useCallback } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import { FaEthereum } from 'react-icons/fa';
import { useCreateNft } from '../../../context/create-nft.context';
import { Category } from '../../../graphql-types';
import { getApolloErrorMessage } from '../../../utils/get-apollo-error-message';
import { EthInput } from '../../core/eth-input';

const useChangeImage = () => {
  const { uploadImage } = useCreateNft();
  return useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const firstFile = event.target.files?.[0];
      if (!firstFile) return;
      await uploadImage(firstFile);
    },
    [uploadImage]
  );
};

const ImageInput = () => {
  const { imageUrl } = useCreateNft();
  const isInvalid = (imageUrl?.length ?? 0) === 0;
  const onChange = useChangeImage();
  return (
    <FormControl isInvalid={isInvalid} isRequired>
      <FormLabel htmlFor="imageUrl">Image file</FormLabel>
      <Input id="imageUrl" type="file" accept="image/*" onChange={onChange} />
      {isInvalid ? (
        <FormErrorMessage>An image is required</FormErrorMessage>
      ) : (
        <FormHelperText>A pretty title for this new NFT</FormHelperText>
      )}
    </FormControl>
  );
};

const TitleInput = () => {
  const { title, setTitle } = useCreateNft();
  const handleChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value),
    [setTitle]
  );
  const isInvalid = title.length === 0;
  return (
    <FormControl isInvalid={isInvalid} isRequired>
      <FormLabel htmlFor="title">Title</FormLabel>
      <Input id="title" type="text" value={title} onChange={handleChangeTitle} />
      {isInvalid ? (
        <FormErrorMessage>Title cannot be empty</FormErrorMessage>
      ) : (
        <FormHelperText>A pretty title for this new NFT</FormHelperText>
      )}
    </FormControl>
  );
};

const StartingPriceInput = () => {
  const { startingPrice, setStartingPrice } = useCreateNft();
  return (
    <FormControl isInvalid={startingPrice != null && startingPrice < 0}>
      <FormLabel htmlFor="startingPrice">Starting price</FormLabel>
      <EthInput value={startingPrice} setValue={setStartingPrice} />
      <FormHelperText>A pretty title for this new NFT</FormHelperText>
    </FormControl>
  );
};

const EndInput = () => {
  const { end, setEnd } = useCreateNft();
  return (
    <FormControl isInvalid={DateTime.fromJSDate(end).diffNow().toMillis() > 3600} isRequired>
      <FormLabel htmlFor="startingPrice">End date</FormLabel>
      <DateTimePicker value={end} onChange={setEnd} />
      <FormHelperText>Date where the bids will end</FormHelperText>
    </FormControl>
  );
};

const CategoryInput = () => {
  const { category, setCategory } = useCreateNft();
  const handleChangeCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => setCategory(event.target.value as Category),
    [setCategory]
  );
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="category">Category</FormLabel>
      <Select id="category" placeholder="Select a category" value={category} onChange={handleChangeCategory}>
        {Object.values(Category).map((category) => (
          <option key={category} value={category}>
            {sentenceCase(category)}
          </option>
        ))}
      </Select>
      <FormHelperText>A pretty title for this new NFT</FormHelperText>
    </FormControl>
  );
};

const ErrorMessage = () => {
  const { errors } = useCreateNft();
  const [firstError] = errors ?? [];
  return (
    <>
      {firstError && (
        <FormControl isInvalid>
          <FormLabel htmlFor="error">Server response</FormLabel>
          <FormErrorMessage>
            {firstError instanceof ApolloError ? getApolloErrorMessage(firstError) : 'Unexpected error'}
          </FormErrorMessage>
        </FormControl>
      )}
    </>
  );
};

export const CreateNftFormControls = () => (
  <>
    <ImageInput />
    <TitleInput />
    <StartingPriceInput />
    <EndInput />
    <CategoryInput />
    <ErrorMessage />
  </>
);
