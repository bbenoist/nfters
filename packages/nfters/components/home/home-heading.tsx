import { Heading, HeadingLevel, HeadingProps, HEADING_STYLES } from '../core/heading';

export const HomeHeading = ({ level, ...props }: HeadingProps) => (
  <Heading level={level} fontWeight="extrabold" textTransform="uppercase" {...props} />
);

export const { HomeH1, HomeH2, HomeH3, HomeH4, HomeH5, HomeH6 } = Object.fromEntries(
  Object.keys(HEADING_STYLES).map((level) => [
    `HomeH${level}`,
    (props: Omit<HeadingProps, 'level'>) => <HomeHeading level={level as HeadingLevel} {...props} />
  ])
);
