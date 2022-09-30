import type { NextPage } from 'next';
import { createStyles, Stack, Title, Text, Group } from '@mantine/core';
import TagList from './TagList';
import type { IItem } from '../../interfaces/item';

const useStyles = createStyles(() => ({
  noSelect: {
    userSelect: 'none',
  },
  textSelect: {
    userSelect: 'text',
  },
}));

const Details: NextPage<IItem> = (props) => {
  const { classes } = useStyles();

  return (
    <Stack spacing="xs" className={classes.noSelect}>
      <Group position="apart">
        <Group spacing="xs">
          <Title order={5} weight={500}>
            {props.label}
          </Title>
          {props.weight && (
            <Text size="xs" color="dimmed">
              {props.weight}g
            </Text>
          )}
        </Group>
        <TagList tags={props.tags} />
      </Group>

      {props.description && (
        <Text size="sm" className={classes.textSelect}>
          {props.description}
        </Text>
      )}
    </Stack>
  );
};

export default Details;
