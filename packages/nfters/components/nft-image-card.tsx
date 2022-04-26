import { Box, BoxProps } from '@chakra-ui/react';
import { useNft } from '../context/nft.context';

export const NftImageCard = (props: BoxProps) => {
  const { imageUrl } = useNft();
  return (
    <Box
      borderRadius="3xl"
      background={`url("${imageUrl}")`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      {...props}
    />
  );
};
