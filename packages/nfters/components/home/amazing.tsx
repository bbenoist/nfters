import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BsCardChecklist, BsFillBarChartFill } from 'react-icons/bs';
import { CenteredHStack } from '../core/centered-hstack';
import { H4 } from '../core/heading';
import { HomeH3 } from './home-heading';

const CatchPhrase = () => <HomeH3 minW={300}>The amazing NFT art of the world is here</HomeH3>;

type KeyPointDescription = { title: string; description: string; icon: IconType };

const KeyPoint = ({ title, description, icon: IconComponent }: KeyPointDescription) => (
  <HStack>
    <Icon alignSelf="flex-start" fontSize="2xl">
      <IconComponent />
    </Icon>
    <VStack align="left">
      <H4>{title}</H4>
      <Text>{description}</Text>
    </VStack>
  </HStack>
);

const KEY_POINTS: KeyPointDescription[] = [
  {
    title: 'Fast transaction',
    description: 'Voluptate labore voluptate do ullamco ullamco ipsum magna exercitation esse incididunt.',
    icon: BsCardChecklist
  },
  {
    title: 'Growth transaction',
    description: 'Adipisicing irure laboris deserunt qui reprehenderit laborum amet consectetur elit et.',
    icon: BsFillBarChartFill
  }
];

export const Amazing = () => (
  <CenteredHStack spacing={12} bg="gray.100" px={12} py={16}>
    <CatchPhrase />
    <HStack>
      {KEY_POINTS.map((props) => {
        const { title } = props;
        return <KeyPoint key={title} {...props} />;
      })}
    </HStack>
  </CenteredHStack>
);
