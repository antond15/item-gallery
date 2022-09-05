import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Group, Button, ActionIcon, Divider, Menu } from '@mantine/core';
import { FaPlus, FaGithub, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import AvatarGroup from './AvatarGroup';

const LeftGroup: NextPage = () => {
  const { data: session } = useSession();

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

      {(session?.user && (
        <Menu trigger="hover">
          <Menu.Target>
            <div>
              <AvatarGroup {...session.user} />
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<FaPlus />}>Add new item</Menu.Item>
            <Menu.Item color="red" icon={<FaSignOutAlt />} onClick={() => signOut()}>
              Sign Out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )) || (
        <Button
          variant="filled"
          color="cyan"
          leftIcon={<FaSignInAlt size={16} />}
          onClick={() => signIn('github')}
        >
          Sign In
        </Button>
      )}
    </Group>
  );
};

export default LeftGroup;
