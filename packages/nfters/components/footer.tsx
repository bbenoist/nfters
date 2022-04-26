import { HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const WorkWithLove = () => (
  <Text>
    {'Work done with ❤ by '}
    <Link href="mailto:return_0@live.com">Baptist BENOIST</Link>
  </Text>
);

type ProfileLinkProps = { href: string; icon: IconType };

const ProfileLink = ({ href, icon: IconComponent }: ProfileLinkProps) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <Icon fontSize="2xl">
      <IconComponent />
    </Icon>
  </Link>
);

const LINKS: ProfileLinkProps[] = [
  { href: 'https://github.com/bbenoist', icon: FaGithub },
  { href: 'https://www.linkedin.com/in/baptist-benoist-84093b6b/', icon: FaLinkedin }
];

const Links = () => (
  <HStack>
    {LINKS.map((link) => {
      const { href } = link;
      return <ProfileLink key={href} {...link} />;
    })}
  </HStack>
);

export const Footer = () => (
  <VStack my={5}>
    <hr />
    <WorkWithLove />
    <Links />
  </VStack>
);
