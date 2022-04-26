import { GetNftsQuery_getNfts, GetNftsQuery_getNfts_author } from '../graphql-types';
import { Author } from './author';

export type Collection = {
  id: string;
  name: string;
  image: string;
  verified?: boolean;
  value: number;
  evolution: number;
  nfts: GetNftsQuery_getNfts[];
  owner: GetNftsQuery_getNfts_author;
};
