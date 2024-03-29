import type { NextPage } from 'next';
import { createStyles, Group, Avatar, Text } from '@mantine/core';

const useStyles = createStyles({
  details: {
    '@media (max-width: 350px)': {
      display: 'none',
    },
  },
});

type Props = {
  image?: string | null;
  name?: string | null;
  email?: string | null;
};

const ProfileGroup: NextPage<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <Group spacing={10}>
      <Avatar src={props.image} size={34} />

      <div className={classes.details}>
        <Text size="sm" weight={500} inline>
          {props.name || 'John Doe'}
        </Text>

        <Text color="dimmed" size="xs" inline>
          {props.email}
        </Text>
      </div>
    </Group>
  );
};

export default ProfileGroup;
