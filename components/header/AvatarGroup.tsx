import type { NextPage } from 'next';
import { Group, Avatar, Stack, Text } from '@mantine/core';

type Props = {
  image?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
};

const AvatarGroup: NextPage<Props> = (props: Props) => {
  return (
    <Group spacing={10}>
      <Avatar src={props.image} size={34} />

      <Stack spacing={0}>
        <Text size="sm" weight={500} inline>
          {props.name || 'John Doe'}
        </Text>

        <Text color="dimmed" size="xs" inline>
          {props.email}
        </Text>
      </Stack>
    </Group>
  );
};

export default AvatarGroup;
