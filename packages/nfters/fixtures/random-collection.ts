import { v4 as uuid } from 'uuid';
import { randBoolean, randFloat, randProductName } from '@ngneat/falso';
import { Collection } from '../model/collection';
import { randomImage } from './random-image';
import { randomNft } from './random-nft';
import { randomAuthor } from './random-author';

export const randomCollection = (): Collection => ({
  id: uuid(),
  name: randProductName(),
  image: randomImage(),
  value: randFloat({ min: 50000, max: 10000000 }),
  evolution: randFloat({ min: -30, max: 30 }),
  verified: randBoolean(),
  nfts: [1, 2, 3, 4, 5, 6].map(() => randomNft()),
  owner: randomAuthor()
});
