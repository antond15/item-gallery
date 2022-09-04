import type { NextPage } from 'next';
import { Group, ActionIcon, Button } from '@mantine/core';
import { FaPlus, FaGithub, FaSignInAlt } from 'react-icons/fa';

const LeftGroup: NextPage = () => {
  return (
    <Group>
      <Button variant="subtle" color="cyan" leftIcon={<FaPlus size={16} />}>
        Add new item
      </Button>
      <ActionIcon variant="light" color="cyan" size="lg">
        <FaGithub size={20} />
      </ActionIcon>
      <Button variant="filled" color="cyan" leftIcon={<FaSignInAlt size={16} />}>
        Sign In
      </Button>
    </Group>
  );
};

export default LeftGroup;
