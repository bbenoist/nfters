import { HStack, StackProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { APP_MAX_WIDTH } from '../../constants';

export const CenteredHStack = ({ bg, ...props }: StackProps) => (
  <HStack alignSelf="stretch" justify="center" bg={bg}>
    <HStack {...props} flexGrow={1} maxW={APP_MAX_WIDTH} />
  </HStack>
);
