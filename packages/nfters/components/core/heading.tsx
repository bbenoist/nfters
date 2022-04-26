import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps } from '@chakra-ui/react';

export type HeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';

export type HeadingProps = Omit<ChakraHeadingProps, 'as'> & { level: HeadingLevel };

export const HEADING_STYLES: Record<HeadingLevel, Partial<HeadingProps>> = {
  '1': { fontSize: '4xl' },
  '2': { fontSize: '3xl' },
  '3': { fontSize: '2xl' },
  '4': { fontSize: 'xl' },
  '5': { fontSize: 'md' },
  '6': { fontSize: 'sm' }
};

export const Heading = ({ level, ...props }: HeadingProps) => (
  <ChakraHeading as={`h${level}`} {...HEADING_STYLES[level]} {...props} />
);

export const { H1, H2, H3, H4, H5, H6 } = Object.fromEntries(
  Object.keys(HEADING_STYLES).map((level) => [
    `H${level}`,
    (props: Omit<HeadingProps, 'level'>) => <Heading level={level as HeadingLevel} {...props} />
  ])
);
