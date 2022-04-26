import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useCreateNft } from '../../../context/create-nft.context';
import { CreateNftForm } from './create-nft-form';
import { NftCreatedModalContent } from './created-nft-modal-content';

export const CreateNftModal = () => {
  const { displayModal, nftCreated, closeModal } = useCreateNft();
  return (
    <Modal isOpen={displayModal} onClose={closeModal}>
      <ModalOverlay />
      {nftCreated ? <NftCreatedModalContent /> : <CreateNftForm />}
    </Modal>
  );
};
