import type { NextPage } from 'next';
import { createStyles, Group, Avatar, TextInput, ActionIcon } from '@mantine/core';
import { FaSearch, FaFilter } from 'react-icons/fa';
import AuthButton from '../auth/AuthButton';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.dark[8],
    padding: theme.spacing.md,
  },
}));

type Props = {
  setQuery?: (query: string) => void;
};

const Header: NextPage<Props> = (props: Props) => {
  const { classes } = useStyles();

  return (
    <Group position="apart" className={classes.wrapper}>
      <Group>
        <Avatar
          src="./header_logo.svg"
          alt="Logo"
          size={36}
          component="a"
          href="https://www.dejv.it/"
        />
        {props.setQuery && (
          <>
            <TextInput
              placeholder="Search images..."
              variant="filled"
              icon={<FaSearch />}
              onChange={(e) => props.setQuery?.(e.currentTarget.value.toLowerCase())}
            />
            <ActionIcon variant="light" color="cyan" size="lg">
              <FaFilter size={16} />
            </ActionIcon>
          </>
        )}
      </Group>
      <AuthButton />
    </Group>
  );
};

export default Header;
