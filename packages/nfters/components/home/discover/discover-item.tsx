import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { NftProvider, useNft } from '../../../context/nft.context';
import { usePlaceBid } from '../../../context/place-bid.context';
import { GetNftsQuery_getNfts } from '../../../graphql-types';
import { EthAmount } from '../../core/eth-amount';
import { H4 } from '../../core/heading';
import { NftImageCard } from '../../nft-image-card';

const Name = () => {
  const { title } = useNft();
  return (
    <H4 whiteSpace="nowrap" overflow="hidden" isTruncated>
      {title}
    </H4>
  );
};

const Stats = () => {
  const { currentBid } = useNft();
  return (
    <HStack alignSelf="stretch" justify="space-between" fontSize="sm">
      <EthAmount value={currentBid} color="green.400" fontWeight="bold" />
      <Text color="gray.800">1 of 321</Text>
    </HStack>
  );
};

const TimeLeft = () => {
  const { end } = useNft();
  return <Box borderRadius="full">{DateTime.fromISO(end).diffNow().toFormat("d'd' h'h' m'm' s's'")}</Box>;
};

const PlaceBidButton = () => {
  const nft = useNft();
  const { setNft } = usePlaceBid();
  const handleClick = useCallback(() => setNft(nft), [nft, setNft]);
  return (
    <Button colorScheme="brand" variant="link" onClick={handleClick}>
      Place a bid
    </Button>
  );
};

const Footer = () => {
  const { end } = useNft();
  const canPlaceBid = DateTime.fromISO(end).diffNow().toMillis() > 0;
  return (
    <HStack justify="space-between">
      <TimeLeft />
      {canPlaceBid && <PlaceBidButton />}
    </HStack>
  );
};

const Body = () => (
  <VStack borderRadius="xl" p={2} bgColor="white" maxW={270}>
    <NftImageCard w={250} h={250} borderRadius="xl" position="relative" />
    <VStack alignSelf="stretch" p={2} align="stretch">
      <Name />
      <Stats />
      <hr />
      <Footer />
    </VStack>
  </VStack>
);

export const DiscoverItem = (props: GetNftsQuery_getNfts) => (
  <NftProvider {...props}>
    <Body />
  </NftProvider>
);
