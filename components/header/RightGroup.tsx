import type { NextPage } from 'next';
import { Group, ActionIcon, Button } from '@mantine/core';
import { FaGithub, FaSignInAlt } from 'react-icons/fa';

const LeftGroup: NextPage = () => {
  return (
    <Group>
      <ActionIcon variant="light" color="cyan">
        <FaGithub size={16} />
      </ActionIcon>
      <Button variant="light" color="cyan" size="xs" leftIcon={<FaSignInAlt />}>
        Sign In
      </Button>
    </Group>
  );
};

export default LeftGroup;
