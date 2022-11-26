import type { NextPage } from 'next';
import { createStyles, Group, Avatar } from '@mantine/core';
import Search from './Search';
import Profile from '../profile';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.dark[8],
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    height: 60,
  },
}));

type Props = {
  query?: string;
  setQuery?: (query: string) => void;
};

const Header: NextPage<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Group position="apart" className={classes.wrapper}>
      <Group>
        <Avatar
          src="./logo.svg"
          alt="Logo"
          size={36}
          component="a"
          href={props.setQuery ? 'https://www.dejv.it/' : '/'}
        />
        {props.setQuery && <Search query={props.query} setQuery={props.setQuery} />}
      </Group>
      <Profile />
    </Group>
  );
};

export default Header;
