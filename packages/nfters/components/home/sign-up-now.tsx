import { Avatar, Box, BoxProps, Button, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { NftProvider, useNft } from '../../context/nft.context';
import { randomNft } from '../../fixtures/random-nft';
import { NftImageCard } from '../nft-image-card';
import { CenteredHStack } from '../core/centered-hstack';
import { HomeH2 } from './home-heading';

type ExampleBodyProps = Required<Pick<BoxProps, 'w' | 'h'>>;

const ExampleBody = ({ w, h }: ExampleBodyProps) => {
  const {
    author: { image: avatarSrc }
  } = useNft();
  return (
    <NftImageCard w={w} h={h} position="relative" borderRadius="xl">
      <Avatar
        src={avatarSrc ?? undefined}
        position="absolute"
        bottom={-5}
        right={-5}
        borderColor="white"
        borderStyle="solid"
        borderWidth={2}
      />
    </NftImageCard>
  );
};

type ExampleProps = ExampleBodyProps & Required<Pick<BoxProps, 'top' | 'left'>>;

const Example = ({ top, left, w, h }: ExampleProps) => {
  const nft = useMemo(() => randomNft(), []);
  return (
    <Box position="absolute" top={top} left={left}>
      <NftProvider {...nft}>
        <ExampleBody w={w} h={h} />
      </NftProvider>
    </Box>
  );
};

const LeftPart = () => (
  <Box w={1500} h={530} position="relative">
    <Example top={0} left={0} w={260} h={280} />
    <Example top={180} left={300} w={220} h={240} />
    <Example top={350} left={90} w={170} h={190} />
  </Box>
);

const SignUpNowButton = () => (
  <Button colorScheme="brand" py={6} px={8}>
    Sign Up Now
  </Button>
);

const RightPart = () => (
  <VStack align="start" spacing={8}>
    <HomeH2>Create and sell your NFTs</HomeH2>
    <Text>
      Ex ut ut Lorem cupidatat proident consequat. Officia incididunt minim quis voluptate enim enim consequat
      ut. Anim esse ad tempor est elit consequat tempor.
    </Text>
    <SignUpNowButton />
  </VStack>
);

export const SignUpNow = () => (
  <CenteredHStack m={20}>
    <LeftPart />
    <RightPart />
  </CenteredHStack>
);
