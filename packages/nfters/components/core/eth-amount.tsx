import { HStack, StackProps, Text } from '@chakra-ui/react';
import { FaEthereum } from 'react-icons/fa';

export type EthAmountProps = StackProps & { value: number };

export const EthAmount = ({ value, ...props }: EthAmountProps) => (
  <HStack spacing="0.125em" whiteSpace="nowrap" {...props}>
    <FaEthereum />
    <Text>{value} ETH</Text>
  </HStack>
);
