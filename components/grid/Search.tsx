import type { NextPage } from 'next';
import { createStyles, Group, Popover, TextInput, ActionIcon } from '@mantine/core';
import { IconFilter, IconSearch } from '@tabler/icons-react';

const useStyles = createStyles({
  searchBar: {
    '@media (max-width: 500px)': {
      display: 'none',
    },
  },
  searchIcon: {
    '@media (min-width: 501px)': {
      display: 'none',
    },
  },
});

type Props = {
  query?: string;
  setQuery: (query: string) => void;
};

const Search: NextPage<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Group spacing={5}>
      <Popover trapFocus withArrow arrowSize={5} arrowOffset={15} position="bottom-start">
        <Popover.Target>
          <ActionIcon variant="filled" size="lg" className={classes.searchIcon}>
            <IconSearch size={20} />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown p={0}>
          <TextInput
            placeholder="Search images..."
            defaultValue={props.query}
            onChange={(e) => props.setQuery(e.currentTarget.value.toLowerCase())}
          />
        </Popover.Dropdown>
      </Popover>

      <TextInput
        placeholder="Search images..."
        variant="filled"
        className={classes.searchBar}
        icon={<IconSearch size={20} />}
        onChange={(e) => props.setQuery(e.currentTarget.value.toLowerCase())}
      />
      <ActionIcon variant="light" color="cyan" size="lg">
        <IconFilter />
      </ActionIcon>
    </Group>
  );
};

export default Search;
