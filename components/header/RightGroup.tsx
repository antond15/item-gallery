import type { NextPage } from 'next';
import { Group, ActionIcon, Divider } from '@mantine/core';
import { FaGithub } from 'react-icons/fa';
import AuthButton from '../auth/AuthButton';

const LeftGroup: NextPage = () => {
  return (
    <Group>
      <ActionIcon
        variant="light"
        color="cyan"
        size="lg"
        component="a"
        href="https://github.com/antond15/item-gallery"
        target="_blank"
      >
        <FaGithub size={20} />
      </ActionIcon>
      <Divider orientation="vertical" />
      <AuthButton />
    </Group>
  );
};

export default LeftGroup;
