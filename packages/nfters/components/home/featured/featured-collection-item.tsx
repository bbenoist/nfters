import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { NftProvider } from '../../../context/nft.context';
import { CollectionProvider, useCollection } from '../../../context/collection.context';
import { Collection } from '../../../model/collection';
import { NftImageCard } from '../../nft-image-card';
import { H4 } from '../../core/heading';
import { GetNftsQuery_getNfts } from '../../../graphql-types';

const FirstNft = () => {
  const {
    nfts: [first]
  } = useCollection();
  return (
    <NftProvider {...first}>
      <NftImageCard w={240} h={240} borderRadius="xl" />
    </NftProvider>
  );
};

const RemainingNft = (props: GetNftsQuery_getNfts) => (
  <NftProvider {...props}>
    <NftImageCard w={75} h={75} borderRadius="md" />
  </NftProvider>
);

const RemainingNfts = () => {
  const { nfts } = useCollection();
  return (
    <VStack>
      {nfts.slice(1, 4).map((nft: GetNftsQuery_getNfts) => {
        const { _id } = nft;
        return <RemainingNft key={_id} {...nft} />;
      })}
    </VStack>
  );
};

const Preview = () => (
  <HStack>
    <FirstNft />
    <RemainingNfts />
  </HStack>
);

const Name = () => {
  const { name } = useCollection();
  return (
    <Box overflow="hidden" whiteSpace="nowrap">
      <H4 isTruncated>{name}</H4>
    </Box>
  );
};

const Ownership = () => {
  const {
    image,
    owner: { name }
  } = useCollection();
  return (
    <HStack>
      <Avatar size="sm" src={image} />
      <Text fontSize="sm" fontWeight="semibold">
        by {name}
      </Text>
    </HStack>
  );
};

const Details = () => {
  const { nfts } = useCollection();
  return (
    <HStack justify="space-between">
      <Ownership />
      <Button colorScheme="brand" variant="outline">
        Total {nfts.length} Items
      </Button>
    </HStack>
  );
};

const Body = () => (
  <VStack flexGrow={1} align="stretch">
    <Preview />
    <Name />
    <Details />
  </VStack>
);

export const FeaturedCollectionItem = (props: Collection) => (
  <CollectionProvider {...props}>
    <Body />
  </CollectionProvider>
);
