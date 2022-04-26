import { Button } from '@chakra-ui/react';
import { useCreateNft } from '../../context/create-nft.context';
import { useWallet } from '../../context/wallet';

export function UploadButton() {
  const { selectedAccount } = useWallet();
  const { openModal } = useCreateNft();
  return (
    <Button colorScheme="brand" onClick={openModal} isDisabled={!selectedAccount}>
      Upload
    </Button>
  );
}
