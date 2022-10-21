import type { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { NextLink } from '@mantine/next';
import { createStyles, Button, Menu } from '@mantine/core';
import { MdAdd, MdDashboard, MdLogout, MdLogin } from 'react-icons/md';
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
          <Menu.Item
            icon={<MdAdd size={16} />}
            component={NextLink}
            href="/submit"
            className={classes.link}
          >
            Add new item
          </Menu.Item>
          {session.user.isAdmin && (
            <Menu.Item
              icon={<MdDashboard size={16} />}
              component={NextLink}
              href="/dashboard"
              className={classes.link}
            >
              Dashboard
            </Menu.Item>
          )}
          <Menu.Item icon={<MdLogout size={16} />} color="red" onClick={() => signOut()}>
            Sign Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )) || (
      <Button
        variant="filled"
        color="cyan"
        leftIcon={<MdLogin size={16} />}
        onClick={() => signIn('github')}
      >
        Sign In
      </Button>
    )
  );
};

export default Profile;
