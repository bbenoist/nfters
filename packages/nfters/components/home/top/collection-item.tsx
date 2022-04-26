import { Avatar, Box, Circle, HStack, Icon, Stat, StatNumber, Text, VStack } from '@chakra-ui/react';
import { createContext, useContext } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { Collection } from '../../../model/collection';
import { H4, H5 } from '../../core/heading';

export type CollectionProps = Collection & { index: number };

const CollectionContext = createContext({} as CollectionProps);

const useCollection = () => useContext(CollectionContext);

const Index = () => {
  const { index } = useCollection();
  return <H4>{index + 1}</H4>;
};

const VerifiedCheckmark = () => (
  <Icon position="absolute" top={-1} right={-1} color="blue.400" fontSize="xl">
    <GoVerified />
  </Icon>
);

const CollectionAvatar = () => {
  const { image, verified } = useCollection();
  return (
    <Box position="relative">
      <Avatar src={image} />
      {verified && <VerifiedCheckmark />}
    </Box>
  );
};

const Name = () => {
  const { name } = useCollection();
  return (
    <Box>
      <H5 isTruncated>{name}</H5>
    </Box>
  );
};

const Value = () => {
  const { value } = useCollection();
  return (
    <HStack justify="left" align="center" spacing={1}>
      <FaEthereum />
      <Text>{value.toLocaleString()}</Text>
    </HStack>
  );
};

const Evolution = () => {
  const { evolution } = useCollection();
  const plusSign = evolution >= 0 ? '+' : '';
  const color = evolution >= 0 ? 'green.400' : 'red.400';
  return (
    <Stat textAlign="right">
      <StatNumber color={color} fontWeight="bold" fontSize="xl">{`${plusSign}${evolution}%`}</StatNumber>
    </Stat>
  );
};

export const CollectionItem = (props: CollectionProps) => (
  <CollectionContext.Provider value={props}>
    <HStack>
      <Index />
      <CollectionAvatar />
      <VStack flexGrow={1} align="left" maxW={150}>
        <Name />
        <Value />
      </VStack>
      <Evolution />
    </HStack>
  </CollectionContext.Provider>
);
