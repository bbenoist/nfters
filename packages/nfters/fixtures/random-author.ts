import { randEthereumAddress, randFullName } from '@ngneat/falso';
import { GetNftsQuery_getNfts_author } from '../graphql-types';

export const randomAuthor = (): GetNftsQuery_getNfts_author => ({
  account: randEthereumAddress(),
  name: randFullName(),
  image: 'https://thispersondoesnotexist.com/image'
});
