import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { usePlaceBid } from '../context/place-bid.context';
import { EthInput } from './core/eth-input';
import { H2 } from './core/heading';

const Header = () => (
  <ModalHeader textAlign="center" padding="6">
    <H2>Place bid</H2>
  </ModalHeader>
);

const ValueInput = () => {
  const { value, setValue } = usePlaceBid();
  return (
    <FormControl isInvalid={value != null && value < 0} isRequired>
      <FormLabel htmlFor="value">Value</FormLabel>
      <EthInput value={value} setValue={setValue} />
      <FormHelperText>A pretty title for this new NFT</FormHelperText>
    </FormControl>
  );
};

const Body = () => (
  <ModalBody display="flex" p={6} flexDirection="column">
    <VStack spacing={6}>
      <ValueInput />
    </VStack>
  </ModalBody>
);

const CancelButton = () => {
  const { setNft } = usePlaceBid();
  const handleClick = useCallback(() => setNft(undefined), [setNft]);
  return <Button onClick={handleClick}>Cancel</Button>;
};

const SubmitButton = () => {
  const { placingBid, placeBid } = usePlaceBid();
  return (
    <Button
      type="submit"
      isLoading={placingBid}
      isDisabled={placingBid}
      colorScheme="brand"
      onClick={placeBid}
    >
      Place
    </Button>
  );
};

const Footer = () => (
  <ModalFooter>
    <HStack>
      <CancelButton />
      <SubmitButton />
    </HStack>
  </ModalFooter>
);

export const PlaceBidForm = () => {
  const { placingBid, placeBid } = usePlaceBid();
  return (
    <ModalContent height="auto">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (placingBid) return;
          placeBid();
        }}
      >
        <fieldset disabled={placingBid}>
          <Header />
          <Body />
          <Footer />
          <ModalCloseButton />
        </fieldset>
      </form>
    </ModalContent>
  );
};

export const PlaceBidModal = () => {
  const { nft, setNft } = usePlaceBid();
  const handleClose = useCallback(() => setNft(undefined), [setNft]);
  return (
    <Modal isOpen={nft != null} onClose={handleClose}>
      <ModalOverlay />
      <PlaceBidForm />
    </Modal>
  );
};
