import { HStack, VStack } from '@chakra-ui/react';
import { NftsProvider, useNfts } from '../../../context/nfts.context';
import { CenteredHStack } from '../../core/centered-hstack';
import { HomeH2 } from '../home-heading';
import { Categories } from './categories';
import { DiscoverItem } from './discover-item';

const Title = () => (
  <HomeH2 whiteSpace="nowrap" overflow="hidden" isTruncated>
    Discover more NFTs
  </HomeH2>
);

const Items = () => {
  const { data: { getNfts: nfts } = { getNfts: [] } } = useNfts();
  return (
    <HStack align="start" overflowX="auto" minW="0" p={2} spacing={6}>
      {nfts.map((nft) => {
        const { _id } = nft;
        return <DiscoverItem key={_id} {...nft} />;
      })}
    </HStack>
  );
};

const Body = () => (
  <CenteredHStack bg="gray.100" m={30} align="stretch" minW="0">
    <VStack align="stretch" minW="0">
      <Title />
      <Categories />
      <Items />
    </VStack>
  </CenteredHStack>
);

export const Discover = () => (
  <NftsProvider>
    <Body />
  </NftsProvider>
);
