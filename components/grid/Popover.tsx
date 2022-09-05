import type { NextPage } from 'next';
import { Stack, Text, Group } from '@mantine/core';
import TagList from './TagList';
import { IItem } from '../../interfaces/item';

const Popover: NextPage<IItem> = (props: IItem) => {
  return (
    <Stack
      spacing="xs"
      style={{
        userSelect: 'none',
      }}
    >
      <Group position="apart">
        <Text weight={500}>{props.label}</Text>
        <TagList tags={props.tags} />
      </Group>

      {props.description && (
        <Text
          size="sm"
          color="dimmed"
          style={{
            userSelect: 'text',
          }}
        >
          {props.description}
        </Text>
      )}
    </Stack>
  );
};

export default Popover;
