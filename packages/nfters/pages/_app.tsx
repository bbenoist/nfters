import '../styles/globals.css';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { APP_THEME } from '../theme';
import { Footer } from '../components/footer';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CreateNftProvider } from '../context/create-nft.context';
import { WalletProvider } from '../context/wallet';
import { PlaceBidProvider } from '../context/place-bid.context';
import { CreateNftModal } from '../components/nav-bar/create-nft-modal';
import { PlaceBidModal } from '../components/place-bid-modal';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: 'no-cache', errorPolicy: 'all' } },
  ssrForceFetchDelay: 200
});

function NftersApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={APP_THEME}>
        <WalletProvider>
          <CreateNftProvider>
            <PlaceBidProvider>
              <Flex direction="column" align="stretch">
                <Component {...pageProps} />
                <Footer />
                <CreateNftModal />
                <PlaceBidModal />
              </Flex>
            </PlaceBidProvider>
          </CreateNftProvider>
        </WalletProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default NftersApp;
