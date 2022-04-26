import MetaMaskOnboarding from '@metamask/onboarding';
import { Maybe } from '@metamask/providers/dist/utils';
import { MutableRefObject, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import { EthAccountMetadata, WalletContext, WalletContextState } from './wallet.context';

export type WalletProviderProps = PropsWithChildren<{}>;

type OnboardingRef = MutableRefObject<MetaMaskOnboarding | undefined>;

const useOnboarding = (): OnboardingRef => {
  const onboarding = useRef<MetaMaskOnboarding>();
  useEffect(() => {
    if (onboarding.current) return;
    onboarding.current = new MetaMaskOnboarding();
  }, []);
  useEffect(() => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) return;
    onboarding.current?.stopOnboarding();
  }, [onboarding]);
  return onboarding;
};

const getAccountMetadata = async (account: string): Promise<EthAccountMetadata> => {
  const ethBalance = await window.web3.eth.getBalance(account ?? '');
  return { balance: window.web3.utils.fromWei(ethBalance) };
};

type NewAccounts = Maybe<(string | undefined)[]>;

type SetAccounts = (accounts: NewAccounts) => void;

type RequestAccounts = () => Promise<void>;

const useAccounts = (): [Record<string, EthAccountMetadata>, SetAccounts] => {
  const [accounts, setAccounts] = useState<Record<string, EthAccountMetadata>>({});
  const setAccountsProxy = useCallback(async (newAccounts: NewAccounts) => {
    if (!newAccounts) return;
    const nonEmptyAccounts = newAccounts.filter((account) => account?.length ?? 0 > 0) as string[];
    window.web3 = new Web3(window.ethereum as any);
    const accountsWithMeta = Object.fromEntries(
      await Promise.all(nonEmptyAccounts.map(async (account) => [account, await getAccountMetadata(account)]))
    );
    setAccounts(accountsWithMeta);
  }, []);
  return [accounts, setAccountsProxy];
};

const useRequestAccounts = (setAccounts: SetAccounts): RequestAccounts =>
  useCallback(async () => {
    const accounts = await window.ethereum?.request<string[]>({ method: 'eth_requestAccounts' });
    setAccounts(accounts);
  }, [setAccounts]);

const useAccountsObserver = (setAccounts: SetAccounts, requestAccounts: RequestAccounts): void => {
  const handleNewAccount = useCallback(
    (accounts: unknown) => setAccounts(accounts as string[]),
    [setAccounts]
  );
  useEffect(() => {
    requestAccounts();
    window.ethereum?.on('accountsChanged', handleNewAccount);
    return () => {
      window.ethereum?.off?.('accountsChanged', handleNewAccount);
    };
  }, [handleNewAccount, requestAccounts]);
};

const useConnect = (
  onboarding: OnboardingRef,
  requestAccounts: RequestAccounts
): Pick<WalletContextState, 'connect'> => {
  const connect = useCallback(async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      requestAccounts();
    } else {
      onboarding.current?.startOnboarding();
    }
  }, [onboarding, requestAccounts]);
  return { connect };
};

const useProvider = (): WalletContextState => {
  const onboarding = useOnboarding();
  const [accounts, setAccounts] = useAccounts();
  const [selectedAccount, selectAccount] = useState<string | undefined>();
  const requestAccounts = useRequestAccounts(setAccounts);
  useAccountsObserver(setAccounts, requestAccounts);
  return {
    connected: MetaMaskOnboarding.isMetaMaskInstalled() && Object.keys(accounts).length > 0,
    accounts,
    selectedAccount: selectedAccount ?? Object.keys(accounts)[0],
    selectAccount,
    ...useConnect(onboarding, requestAccounts)
  };
};

export const WalletProvider = ({ children }: WalletProviderProps) => (
  <WalletContext.Provider value={useProvider()}>{children}</WalletContext.Provider>
);

export default WalletProvider;
