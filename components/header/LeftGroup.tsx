import type { NextPage } from 'next';
import { Group, Avatar, TextInput, ActionIcon } from '@mantine/core';
import { FaSearch, FaFilter } from 'react-icons/fa';

type Props = {
  noSearch?: boolean;
  setQuery: (query: string) => void;
};

const LeftGroup: NextPage<Props> = (props: Props) => {
  return (
    <Group>
      <Avatar
        src="./header_logo.svg"
        alt="Logo"
        size={36}
        component="a"
        href="https://www.dejv.it/"
      />
      {!props.noSearch && (
        <>
          <TextInput
            placeholder="Search images..."
            variant="filled"
            icon={<FaSearch />}
            onChange={(e) => props.setQuery(e.currentTarget.value.toLowerCase())}
          />
          <ActionIcon variant="light" color="cyan" size="lg">
            <FaFilter size={16} />
          </ActionIcon>
        </>
      )}
    </Group>
  );
};

export default LeftGroup;
