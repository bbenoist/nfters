import { extendTheme } from '@chakra-ui/react';

export const APP_THEME = extendTheme({
  colors: {
    brand: {
      100: '#3d00b7',
      200: '#3d00b7',
      300: '#3d00b7',
      400: '#3d00b7',
      500: '#3d00b7',
      600: '#3d00b7',
      700: '#3d00b7',
      800: '#3d00b7',
      900: '#3d00b7'
    }
  },
  components: {
    Button: { baseStyle: { borderRadius: 'full' }, variants: { outline: { borderWidth: 2 } } }
  }
});
