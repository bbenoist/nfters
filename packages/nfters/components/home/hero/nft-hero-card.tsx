import { Avatar, Box, BoxProps, chakra, Circle, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { PropsWithChildren, SVGProps } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { NftProvider, useNft } from '../../../context/nft.context';
import { NftImageCard } from '../../nft-image-card';
import { H3 } from '../../core/heading';
import { EthAmount } from '../../core/eth-amount';
import { GetNftsQuery_getNfts } from '../../../graphql-types';

const Title = () => {
  const { title } = useNft();
  return <H3>{title}</H3>;
};

const AuthorRow = () => {
  const {
    author: { name, image }
  } = useNft();
  return (
    <HStack>
      <Avatar src={image ?? undefined} size="sm" />
      <Text fontWeight="semibold">{name}</Text>
    </HStack>
  );
};

const StatusBackground = () => (
  <Box
    position="absolute"
    top={0}
    left={0}
    w="full"
    h="full"
    bg="whiteAlpha.400"
    borderRadius="xl"
    backdropFilter="blur(.25em)"
  />
);

type StatusColumnProps = PropsWithChildren<{ title: string }>;

const StatusColumn = ({ title, children }: StatusColumnProps) => (
  <VStack align="left" spacing={0}>
    <Text>{title}</Text>
    <HStack fontSize="xl" spacing={1}>
      {children}
    </HStack>
  </VStack>
);

const CurrentBid = () => {
  const { currentBid } = useNft();
  return (
    <StatusColumn title="Current bid">
      <EthAmount value={currentBid} />
    </StatusColumn>
  );
};

const EndsIn = () => {
  return (
    <StatusColumn title="Ends in">
      <Text>
        <strong>12</strong>h <strong>43</strong>m <strong>42</strong>s
      </Text>
    </StatusColumn>
  );
};

const StatusBody = () => (
  <HStack justify="space-around" position="absolute" top={0} left={0} w="full" h="full">
    <CurrentBid />
    <EndsIn />
  </HStack>
);

const Status = () => (
  <Box position="relative" m={6} p={2} justifySelf="end" h={75}>
    <StatusBackground />
    <StatusBody />
  </Box>
);

const Description = () => (
  <VStack w="full" h="full" align="stretch" p={4} color="white">
    <Title />
    <AuthorRow />
    <Spacer />
    <Status />
  </VStack>
);

const LiveNftIcon = chakra(FaEthereum);

const LIVE_AUCTION_BADGE_POSITION: Pick<BoxProps, 'position' | 'top' | 'left'> = {
  position: 'absolute',
  top: '220px',
  left: '-50px'
};

type CirclePathProps = SVGProps<SVGPathElement> & { x: number; y: number; radius: number };

const CirclePath = ({ x, y, radius, ...props }: CirclePathProps) => (
  <path
    d={`
      M ${x} ${y}
      m -${radius}, 0
      a ${radius},${radius} 0 1,0 ${radius * 2},0
      a ${radius},${radius} 0 1,0 ${-radius * 2},0
  `}
    {...props}
  />
);

const LiveNftBadge = () => (
  <>
    <Circle {...LIVE_AUCTION_BADGE_POSITION} size="100px" background="red.100" p={0}>
      <LiveNftIcon fontSize="3xl" transform="rotate(30deg);" />
    </Circle>
    <Box {...LIVE_AUCTION_BADGE_POSITION}>
      <svg fill="none">
        <CirclePath x={50} y={50} radius={50} id="live-auction-badge-text" />
        <text fill="black" fontSize=".8em" textLength="300" dy="-10">
          <textPath xlinkHref="#live-auction-badge-text">{'LIVE AUCTION - LIVE AUCTION -'}</textPath>
        </text>
      </svg>
    </Box>
  </>
);

const Body = () => (
  <NftImageCard position="relative" w={360} h={400}>
    <Description />
    <LiveNftBadge />
  </NftImageCard>
);

export const NftHeroCard = (props: GetNftsQuery_getNfts) => (
  <NftProvider {...props}>
    <Body />
  </NftProvider>
);
