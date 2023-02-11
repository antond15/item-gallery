import type { NextPage } from 'next';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { createStyles, Button, Menu } from '@mantine/core';
import { IconLayoutDashboard, IconLogin, IconLogout, IconPlus } from '@tabler/icons-react';
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
            icon={<IconPlus size={16} />}
            component={Link}
            href="/submit"
            className={classes.link}
          >
            Add new item
          </Menu.Item>
          {session.user.isAdmin && (
            <Menu.Item
              icon={<IconLayoutDashboard size={16} />}
              component={Link}
              href="/dashboard"
              className={classes.link}
            >
              Dashboard
            </Menu.Item>
          )}
          <Menu.Item icon={<IconLogout size={16} />} color="red" onClick={() => signOut()}>
            Sign Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )) || (
      <Button
        variant="filled"
        color="cyan"
        leftIcon={<IconLogin size={16} />}
        onClick={() => signIn('github')}
      >
        Sign In
      </Button>
    )
  );
};

export default Profile;
