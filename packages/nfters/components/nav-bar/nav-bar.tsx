import { HStack, Link, Spacer } from '@chakra-ui/react';
import { APP_MAX_WIDTH } from '../../constants';
import { Logo } from '../logo';
import { SearchInput } from './search-input';
import { UploadButton } from './upload-button';
import { WalletProfile } from './wallet-profile';

type PageLinkDescription = { label: string; href: string };

const PAGES_LINKS: PageLinkDescription[] = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Resource', href: '/resource' },
  { label: 'About', href: '/about' }
];

const PagesLinks = () => (
  <>
    {PAGES_LINKS.map(({ label, href }) => (
      <Link key={label} href={href}>
        {label}
      </Link>
    ))}
  </>
);

const Resources = () => (
  <>
    <SearchInput maxW={200} />
    <UploadButton />
  </>
);

export const NavBar = () => (
  <>
    <HStack
      data-testid="nav-bar"
      alignSelf="stretch"
      justify="center"
      borderBottom={1}
      borderBottomColor="gray.200"
      borderBottomStyle="solid"
    >
      <HStack flexGrow={1} maxW={APP_MAX_WIDTH} p={4} spacing={8}>
        <Logo />
        <Spacer />
        <PagesLinks />
        <Spacer />
        <Resources />
        <WalletProfile />
      </HStack>
    </HStack>
  </>
);
