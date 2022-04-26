import { createContext, PropsWithChildren, useContext } from 'react';
import { Collection } from '../model/collection';

const CollectionContext = createContext({} as Collection);

export const useCollection = () => useContext(CollectionContext);

export type CollectionProviderProps = PropsWithChildren<Collection>;

export const CollectionProvider = ({ children, ...props }: CollectionProviderProps) => (
  <CollectionContext.Provider value={props}>{children}</CollectionContext.Provider>
);
