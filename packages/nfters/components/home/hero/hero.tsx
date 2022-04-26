import { Box, Button, HStack, Stat, StatHelpText, StatNumber, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMemo } from 'react';
import { APP_MAX_WIDTH } from '../../../constants';
import { randomNft } from '../../../fixtures/random-nft';
import { compactNumber } from '../../../utils/compact-number';
import { HomeH1 } from '../home-heading';
import { NftHeroCard } from './nft-hero-card';

const CatchPhrase = () => <HomeH1>Discover and collect digital art NFTs</HomeH1>;

const Description = () => (
  <Text fontSize="xl">
    Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell and discover
    exclusive digital assets.
  </Text>
);

const CallToAction = () => (
  <Box justifySelf="left">
    <NextLink href="/explore" passHref>
      <Button my={4} colorScheme="brand" variant="solid" fontSize="xl" py="8" px="12">
        Explore now
      </Button>
    </NextLink>
  </Box>
);

type HeroStatDescription = { label: string; count: number };

const HERO_STATS: HeroStatDescription[] = [
  { label: 'Artworks', count: 90000 },
  { label: 'Nfts', count: 12000 },
  { label: 'Artists', count: 15000 }
];

const Stats = () => (
  <HStack align="flex-start" spacing={4}>
    {HERO_STATS.map(({ label, count }) => (
      <Stat key={label} flexGrow={0}>
        <StatNumber fontWeight="extrabold" fontSize="4xl">
          {`${compactNumber(count)}+`}
        </StatNumber>
        <StatHelpText fontSize="md">{label}</StatHelpText>
      </Stat>
    ))}
  </HStack>
);

const LeftPart = () => (
  <VStack flexGrow={1} align="left" spacing={4}>
    <CatchPhrase />
    <Description />
    <CallToAction />
    <Stats />
  </VStack>
);

const RightPart = () => {
  const nfts = useMemo(() => [1, 2, 3].map(() => randomNft()), []);
  return (
    <HStack align="left" w={850}>
      <Box position="relative" h={400}>
        {nfts.map((nft, index) => {
          const { _id } = nft;
          const revIndex = nfts.length - index;
          const scale = (index + 1 + 8) / (nfts.length + 8);
          const left = revIndex * 50 - 50;
          return (
            <Box
              key={_id}
              position="absolute"
              top="0"
              left="0"
              transform={`translate(${left}px, 0px) scale(${scale});`}
            >
              <NftHeroCard key={_id} {...nft} />
            </Box>
          );
        })}
      </Box>
    </HStack>
  );
};

export const Hero = () => (
  <HStack alignSelf="stretch" justify="center" py={12}>
    <HStack flexGrow={1} maxW={APP_MAX_WIDTH} spacing={20}>
      <LeftPart />
      <RightPart />
    </HStack>
  </HStack>
);
