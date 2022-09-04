import type { NextPage } from 'next';
import { Group, Select, ActionIcon } from '@mantine/core';
import { FaSearch, FaFilter } from 'react-icons/fa';

const LeftGroup: NextPage = () => {
  return (
    <Group>
      <Select
        placeholder="Search images..."
        icon={<FaSearch />}
        variant="filled"
        searchable
        data={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
          { value: '4', label: 'Option 4' },
          { value: '5', label: 'Option 5' },
        ]}
      />
      <ActionIcon variant="light" color="cyan" size="lg">
        <FaFilter size={16} />
      </ActionIcon>
    </Group>
  );
};

export default LeftGroup;
