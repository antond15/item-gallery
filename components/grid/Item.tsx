import type { NextPage } from 'next';
import Image from 'next/image';
import { createStyles, Box, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: theme.colors.dark[6],
    width: '100px',
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
    userSelect: 'none',
  },
  label: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    background: theme.colors.dark[4],
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
}));

type Props = {
  image: string;
  label: string;
};

const Item: NextPage<Props> = (props: Props) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Image src={props.image} alt={props.label} width="100px" height="100px" layout="responsive" />
      <Text align="center" className={classes.label}>
        {props.label}
      </Text>
    </Box>
  );
};

export default Item;
