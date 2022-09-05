import type { NextPage } from 'next';
import { useMantineTheme, Box, Image, Text } from '@mantine/core';

type Props = {
  src: string;
  label: string;
};

const Item: NextPage<Props> = (props: Props) => {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        background: theme.colors.dark[6],
        width: '100px',
        borderRadius: theme.radius.sm,
        overflow: 'hidden',
      }}
    >
      <Image src={props.src} alt={props.label} width="100px" height="100px" />
      <Text
        align="center"
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          background: theme.colors.dark[4],
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        }}
      >
        {props.label}
      </Text>
    </Box>
  );
};

export default Item;
