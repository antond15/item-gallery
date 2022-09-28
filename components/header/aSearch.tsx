import type { NextPage } from 'next';
import { createStyles, Group, Popover, TextInput, ActionIcon } from '@mantine/core';
import { FaSearch, FaFilter } from 'react-icons/fa';

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

const Search: NextPage<Props> = (props: Props) => {
  const { classes } = useStyles();

  return (
    <Group spacing={5}>
      <Popover trapFocus withArrow arrowSize={5} arrowOffset={15} position="bottom-start">
        <Popover.Target>
          <ActionIcon variant="filled" size="lg" className={classes.searchIcon}>
            <FaSearch size={16} />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown sx={{ padding: 0 }}>
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
        icon={<FaSearch />}
        onChange={(e) => props.setQuery(e.currentTarget.value.toLowerCase())}
      />
      <ActionIcon variant="light" color="cyan" size="lg">
        <FaFilter size={16} />
      </ActionIcon>
    </Group>
  );
};

export default Search;
