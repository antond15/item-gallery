import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { NextLink } from '@mantine/next';
import { Button, Menu } from '@mantine/core';
import { FaPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import AvatarGroup from './AvatarGroup';

const AuthButton: NextPage = () => {
  const { data: session } = useSession();

  return (
    (session?.user && (
      <Menu trigger="hover">
        <Menu.Target>
          <div>
            <AvatarGroup {...session.user} />
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            icon={<FaPlus />}
            component={NextLink}
            href="/create"
            style={{ lineHeight: 1.15 }}
          >
            Add new item
          </Menu.Item>
          <Menu.Item icon={<FaSignOutAlt />} color="red" onClick={() => signOut()}>
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
    )
  );
};

export default AuthButton;
