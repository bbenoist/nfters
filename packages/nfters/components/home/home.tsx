import { VStack } from '@chakra-ui/react';
import { NavBar } from '../nav-bar';
import { Amazing } from './amazing';
import { Discover } from './discover';
import { Featured } from './featured';
import { Hero } from './hero';
import { SignUpNow } from './sign-up-now';
import { Top } from './top';

const Content = () => (
  <>
    <Hero />
    <Amazing />
    <Top />
    <Featured />
    <SignUpNow />
    <Discover />
  </>
);

export const Home = () => (
  <VStack>
    <NavBar />
    <Content />
  </VStack>
);
