import {
  Button,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack
} from '@chakra-ui/react';
import { useCreateNft } from '../../../context/create-nft.context';
import { H2, H3 } from '../../core/heading';
import { CreateNftFormControls } from './create-nft-form-controls';

const Header = () => (
  <ModalHeader textAlign="center" padding="6">
    <H2>Upload a new NFT</H2>
  </ModalHeader>
);

const Body = () => (
  <ModalBody display="flex" p={6} flexDirection="column">
    <VStack spacing={6}>
      <CreateNftFormControls />
    </VStack>
  </ModalBody>
);

const CancelButton = () => {
  const { closeModal } = useCreateNft();
  return <Button onClick={closeModal}>Cancel</Button>;
};

const CreateButton = () => {
  const { canCreateNft, creatingNft } = useCreateNft();
  return (
    <Button type="submit" isLoading={creatingNft} isDisabled={!canCreateNft} colorScheme="brand">
      Create
    </Button>
  );
};

const Footer = () => (
  <ModalFooter>
    <HStack>
      <CancelButton />
      <CreateButton />
    </HStack>
  </ModalFooter>
);

export const CreateNftForm = () => {
  const { uploadingImage, canCreateNft, createNft } = useCreateNft();
  return (
    <ModalContent height="auto">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!canCreateNft) return;
          createNft();
        }}
      >
        <fieldset disabled={uploadingImage}>
          <Header />
          <Body />
          <Footer />
          <ModalCloseButton />
        </fieldset>
      </form>
    </ModalContent>
  );
};
