import { Box } from '@chakra-ui/react';
import { CenteredHStack } from '../../core/centered-hstack';
import { TopNfts } from './top-nft';
import { TopCollections } from './top-collections';

export const Top = () => (
  <CenteredHStack my={20} justify="space-between">
    <TopNfts />
    <Box w="1px" alignSelf="stretch" bgColor="gray.200"></Box>
    <TopCollections />
  </CenteredHStack>
);
