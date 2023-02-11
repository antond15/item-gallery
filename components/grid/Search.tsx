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
    <>
      {/* Phone */}
      <Popover trapFocus withArrow arrowSize={5} arrowOffset={15} position="bottom-start">
        <Popover.Target>
          <ActionIcon className={classes.searchIcon} variant="filled" size="lg">
            <IconSearch size={20} />
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown p={0}>
          <TextInput
            placeholder="Vyhledat obrázky..."
            defaultValue={props.query}
            onChange={(e) => props.setQuery(e.currentTarget.value.toLowerCase())}
          />
        </Popover.Dropdown>
      </Popover>

      {/* Desktop */}
      <TextInput
        className={classes.searchBar}
        placeholder="Vyhledat obrázky..."
        variant="filled"
        icon={<IconSearch size={20} />}
        onChange={(e) => props.setQuery(e.currentTarget.value.toLowerCase())}
      />
    </>
  );
};

export default Search;
