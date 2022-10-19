import type { NextPage } from 'next';
import { createStyles, HoverCard, Box, Text } from '@mantine/core';
import Image from 'next/image';
import type { IItem } from '@interfaces';
import Details from './Details';

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

const Item: NextPage<IItem> = (props) => {
  const { classes } = useStyles();

  return (
    <HoverCard withArrow openDelay={250} width="320px">
      <HoverCard.Target>
        <Box className={classes.wrapper}>
          <Image
            src={props.image}
            alt={props.label}
            width="100px"
            height="100px"
            layout="responsive"
          />
          <Text align="center" className={classes.label}>
            {props.label}
          </Text>
        </Box>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Details {...props} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default Item;
