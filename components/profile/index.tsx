import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { NextLink } from '@mantine/next';
import { createStyles, Button, Menu } from '@mantine/core';
import { FaPlus, FaGripHorizontal, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import ProfileGroup from './ProfileGroup';

const useStyles = createStyles({
  link: {
    lineHeight: 1.15,
  },
});

const Profile: NextPage = () => {
  const { classes } = useStyles();
  const { data: session } = useSession();

  return (
    (session?.user && (
      <Menu trigger="hover">
        <Menu.Target>
          <div>
            <ProfileGroup {...session.user} />
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<FaPlus />} component={NextLink} href="/submit" className={classes.link}>
            Add new item
          </Menu.Item>
          {session.user.isAdmin && (
            <Menu.Item
              icon={<FaGripHorizontal />}
              component={NextLink}
              href="/dashboard"
              className={classes.link}
            >
              Dashboard
            </Menu.Item>
          )}
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

export default Profile;
