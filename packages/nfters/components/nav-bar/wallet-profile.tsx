import { Box, Button, ButtonGroup, ButtonProps, Text } from '@chakra-ui/react';
import { useWallet, WalletProvider } from '../../context/wallet';

const AccountIdLabel = () => {
  const { selectedAccount } = useWallet();
  return <Text isTruncated>{selectedAccount}</Text>;
};

const AccountLabel = () => {
  const { accounts, selectedAccount } = useWallet();
  const { balance = NaN } = accounts[selectedAccount ?? ''] ?? {};
  return (
    <>
      <Button isDisabled borderRight={0}>
        {balance} ETH
      </Button>
      <Button maxW={120}>
        <AccountIdLabel />
      </Button>
    </>
  );
};

export const WalletProfile = () => {
  const { connected, connect } = useWallet();
  return (
    <ButtonGroup colorScheme="brand" variant="outline" isAttached>
      {connected ? <AccountLabel /> : <Button onClick={connect}>Connect Wallet</Button>}
    </ButtonGroup>
  );
};
