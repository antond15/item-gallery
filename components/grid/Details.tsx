import type { NextPage } from 'next';
import { createStyles, Stack, Text, Group } from '@mantine/core';
import TagList from './TagList';
import { IItem } from '../../interfaces/item';

const useStyles = createStyles(() => ({
  noSelect: {
    userSelect: 'none',
  },
  textSelect: {
    userSelect: 'text',
  },
}));

const Details: NextPage<IItem> = (props: IItem) => {
  const { classes } = useStyles();

  return (
    <Stack spacing="xs" className={classes.noSelect}>
      <Group position="apart">
        <Text weight={500}>{props.label}</Text>
        <TagList tags={props.tags} />
      </Group>

      {props.description && (
        <Text size="sm" color="dimmed" className={classes.textSelect}>
          {props.description}
        </Text>
      )}
    </Stack>
  );
};

export default Details;
