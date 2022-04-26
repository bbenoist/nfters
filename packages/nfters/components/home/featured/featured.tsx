import { HStack, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { randomCollection } from '../../../fixtures/random-collection';
import { CenteredHStack } from '../../core/centered-hstack';
import { HomeH2 } from '../home-heading';
import { FeaturedCollectionItem } from './featured-collection-item';

const Title = () => <HomeH2 alignSelf="start">Featured NFT Collections</HomeH2>;

const Collections = () => {
  const collections = useMemo(() => [1, 2, 3].map(() => randomCollection()), []);
  return (
    <HStack spacing={20}>
      {collections.map((collection) => {
        const { id } = collection;
        return <FeaturedCollectionItem key={id} {...collection} />;
      })}
    </HStack>
  );
};

export const Featured = () => (
  <CenteredHStack bg="gray.100" my={50}>
    <VStack flexGrow={1} spacing={8} align="stretch">
      <Title />
      <Collections />
    </VStack>
  </CenteredHStack>
);
