import type { NextPage } from 'next';
import { Stack, Text, Group, Badge } from '@mantine/core';
import { IItem } from '../../interfaces/item';

const Popover: NextPage<IItem> = (props: IItem) => {
  return (
    <Stack
      spacing="xs"
      style={{
        userSelect: 'none',
      }}
    >
      <Text weight={500}>{props.label}</Text>

      {props.tags && (
        <Group spacing={4}>
          {props.tags.map((tag, index) => (
            <Badge key={index} size="sm">
              {tag}
            </Badge>
          ))}
        </Group>
      )}

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
