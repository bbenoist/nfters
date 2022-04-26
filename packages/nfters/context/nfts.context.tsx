import { gql, QueryResult, useQuery } from '@apollo/client';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Category, GetNftsQuery, GetNftsQueryVariables } from '../graphql-types';

export const GET_NFTS_QUERY = gql`
  query GetNftsQuery($category: Category) {
    getNfts(filter: { category: $category }) {
      _id
      imageUrl
      title
      author {
        name
        image
        account
      }
      end
      startingPrice
      bids {
        value
      }
    }
  }
`;

export type CategoryFilter = Category | 'all';

export type NftsState = QueryResult<GetNftsQuery, GetNftsQueryVariables> & {
  category: CategoryFilter;
  setCategory: (category: CategoryFilter) => void;
};

const NftsContext = createContext({} as NftsState);

export const useNfts = () => useContext(NftsContext);

const useProvider = (): NftsState => {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const gqlCategory = category === 'all' ? undefined : category;
  const result = useQuery<GetNftsQuery, GetNftsQueryVariables>(GET_NFTS_QUERY, {
    variables: { category: gqlCategory },
    notifyOnNetworkStatusChange: true
  });
  return { ...result, category, setCategory };
};

export const NftsProvider = ({ children }: PropsWithChildren<{}>) => (
  <NftsContext.Provider value={useProvider()}>{children}</NftsContext.Provider>
);
