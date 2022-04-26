import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { GetNftsQuery_getNfts } from '../graphql-types';

export type NftState = { currentBid: number } & GetNftsQuery_getNfts;

const NftContext = createContext({} as NftState);

export const useNft = () => useContext(NftContext);

const useProvider = ({ bids, startingPrice, ...props }: GetNftsQuery_getNfts): NftState => {
  const currentBid = useMemo(
    () => bids.reduce((prev, { value }) => Math.max(prev, value), startingPrice ?? 0),
    [bids, startingPrice]
  );
  return { ...props, bids, startingPrice, currentBid };
};

export type NftProviderProps = PropsWithChildren<GetNftsQuery_getNfts>;

export const NftProvider = ({ children, ...props }: NftProviderProps) => (
  <NftContext.Provider value={useProvider(props)}>{children}</NftContext.Provider>
);
