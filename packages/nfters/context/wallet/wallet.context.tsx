import { createContext, useContext } from 'react';

export type EthAccountMetadata = { balance: string };

export type WalletState = {
  connected: boolean;
  accounts: Record<string, EthAccountMetadata>;
  selectedAccount?: string;
  selectAccount: (id: string) => void;
  error?: unknown;
};

export type WalletContextState = WalletState & {
  connect: () => void;
};

export const WalletContext = createContext({} as WalletContextState);

export const useWallet = () => useContext(WalletContext);
