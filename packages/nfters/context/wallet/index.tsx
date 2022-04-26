import dynamic from 'next/dynamic';

export { useWallet } from './wallet.context';
export type { WalletState } from './wallet.context';

export const WalletProvider = dynamic(() => import('./wallet.provider'), { ssr: false });
