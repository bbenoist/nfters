import { Avatar, AvatarProps } from '@chakra-ui/react';
import { useNft } from '../context/nft.context';

export type NftAuthorAvararProps = Omit<AvatarProps, 'src'>;

export const NftAuthorAvarar = (props: AvatarProps) => {
  const {
    author: { image }
  } = useNft();
  return <Avatar src={image ?? undefined} {...props} />;
};
