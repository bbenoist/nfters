import { randFloat, randProductName, randSoonDate } from '@ngneat/falso';
import { v4 as uuid } from 'uuid';
import { randomImage } from './random-image';
import { randomAuthor } from './random-author';
import { GetNftsQuery_getNfts } from '../graphql-types';

export const randomNft = (): GetNftsQuery_getNfts => ({
  _id: uuid(),
  title: randProductName(),
  author: randomAuthor(),
  imageUrl: randomImage(),
  startingPrice: 0,
  bids: [{ value: randFloat({ min: 0, max: 0.8 }) }],
  end: randSoonDate({ days: 5 })
});
