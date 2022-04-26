import { Avatar, Box, Button, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { NftProvider, useNft } from '../../../context/nft.context';
import { NftImageCard } from '../../nft-image-card';
import { H5 } from '../../core/heading';
import { EthAmount } from '../../core/eth-amount';
import { NftAuthorAvarar } from '../../nft-author-avatar';
import { randomNft } from '../../../fixtures/random-nft';
import { useMemo } from 'react';

const Name = () => {
  const { title } = useNft();
  return <H5 isTruncated>{title}</H5>;
};

const HighestBid = () => {
  const { currentBid } = useNft();
  return (
    <VStack alignSelf="stretch" align="left" spacing={0}>
      <Text fontSize="sm" whiteSpace="nowrap">
        Highest Bid
      </Text>
      <EthAmount value={currentBid} fontWeight="bold" />
      <Spacer />
    </VStack>
  );
};

const FirstNftDescription = () => (
  <HStack>
    <NftAuthorAvarar />
    <VStack align="left" flexGrow={1} overflow="hidden">
      <Name />
      <Text fontSize="sm" whiteSpace="nowrap">
        10 in the stock
      </Text>
    </VStack>
    <HighestBid />
  </HStack>
);

const FirstNft = () => {
  const firstNft = useMemo(() => randomNft(), []);
  return (
    <NftProvider {...firstNft}>
      <VStack w={300} align="stretch">
        <NftImageCard h={300} />
        <FirstNftDescription />
      </VStack>
    </NftProvider>
  );
};

const RemainingNftHighestBid = () => {
  const { currentBid } = useNft();
  return (
    <Box
      borderStyle="solid"
      borderWidth={2}
      borderColor="green.400"
      color="green.400"
      borderRadius="md"
      fontSize="xs"
      px={1}
    >
      <EthAmount value={currentBid} />
    </Box>
  );
};

const RemainingNftDetails = () => {
  const {
    author: { image: avatarSrc }
  } = useNft();
  return (
    <HStack fontSize="sm">
      <Avatar size="sm" src={avatarSrc ?? undefined} />
      <RemainingNftHighestBid />
      <Text colorScheme="gray">1 of 8</Text>
    </HStack>
  );
};

const PlaceABidButton = () => (
  <Button alignSelf="start" colorScheme="brand" size="sm" p={4}>
    Place a bid
  </Button>
);

const RemainingNft = () => (
  <HStack>
    <NftImageCard w={100} h={100} borderRadius="md" />
    <VStack align="left">
      <Name />
      <RemainingNftDetails />
      <PlaceABidButton />
    </VStack>
  </HStack>
);

const RemainingNfts = () => {
  const remainingNfts = useMemo(() => [1, 2, 3].map(() => randomNft()), []);
  return (
    <VStack align="stretch" spacing={8}>
      {remainingNfts.map((nft) => {
        const { _id } = nft;
        return (
          <NftProvider key={_id} {...nft}>
            <RemainingNft />
          </NftProvider>
        );
      })}
    </VStack>
  );
};

export const TopNfts = () => (
  <HStack spacing={8} align="top">
    <FirstNft />
    <RemainingNfts />
  </HStack>
);
