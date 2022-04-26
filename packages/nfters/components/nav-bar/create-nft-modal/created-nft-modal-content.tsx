import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text
} from '@chakra-ui/react';
import { useCreateNft } from '../../../context/create-nft.context';
import { H2 } from '../../core/heading';

const Header = () => (
  <ModalHeader textAlign="center" padding="6">
    <H2>NFT created successfully 🚀</H2>
  </ModalHeader>
);

const Message = () => (
  <Text>
    {
      "Congratulations! Your NFT was created on our servers and is now available for sale. Let's get rich and purchase a famous social network 💰"
    }
  </Text>
);

const Body = () => (
  <ModalBody display="flex" p={6} flexDirection="column">
    <Message />
  </ModalBody>
);

const CloseButton = () => {
  const { closeModal } = useCreateNft();
  return (
    <Button variant="outline" colorScheme="brand" onClick={closeModal}>
      Close
    </Button>
  );
};

const Footer = () => (
  <ModalFooter>
    <CloseButton />
  </ModalFooter>
);

export const NftCreatedModalContent = () => (
  <ModalContent height="auto">
    <Header />
    <Body />
    <Footer />
  </ModalContent>
);
