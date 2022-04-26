import { Text } from '@chakra-ui/react';
import { APP_DISPLAY_NAME } from '../constants';

export const Logo = () => (
  <Text color="brand.500" fontWeight="extrabold">
    {APP_DISPLAY_NAME}
  </Text>
);
