import type { NextPage } from 'next';
import { createStyles, Group } from '@mantine/core';
import LeftGroup from './LeftGroup';
import RightGroup from './RightGroup';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.dark[8],
    padding: theme.spacing.md,
  },
}));

type Props = {
  setQuery: (query: string) => void;
};

const Header: NextPage<Props> = (props: Props) => {
  const { classes } = useStyles();

  return (
    <Group position="apart" className={classes.wrapper}>
      <LeftGroup {...props} />
      <RightGroup />
    </Group>
  );
};

export default Header;
