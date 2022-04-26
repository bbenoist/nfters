import { Text, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';
import { randomCollection } from '../../../fixtures/random-collection';
import { HomeH5 } from '../home-heading';
import { CollectionItem } from './collection-item';

const Title = () => <HomeH5>Top collections over</HomeH5>;

const Period = () => (
  <Text color="brand.500" fontWeight="bold">
    Last 7 days
  </Text>
);

const Header = () => (
  <VStack align="left">
    <Title />
    <Period />
  </VStack>
);

const Collections = () => {
  const topCollections = [1, 2, 3, 4, 5].map(() => randomCollection());
  return (
    <>
      {topCollections.map((collection, index) => {
        const { id } = collection;
        return (
          <Fragment key={id}>
            {index > 0 && <hr />}
            <CollectionItem index={index} {...collection} />
          </Fragment>
        );
      })}
    </>
  );
};

export const TopCollections = () => (
  <VStack align="stretch" minW={275}>
    <Header />
    <Collections />
  </VStack>
);
