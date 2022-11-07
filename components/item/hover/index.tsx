import type { NextPage } from 'next';
import { createStyles, Stack, Title, Text, Group } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { useToggle } from '@mantine/hooks';
import TagList from './TagList';
import ButtonGroup from './ButtonGroup';
import type { IItem } from '@interfaces';
import getLuaItem from '@utils/getLuaItem';

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
  const [isLuaVisible, toggleLua] = useToggle();

  return (
    <Stack spacing="xs" className={classes.noSelect}>
      <Group position="apart">
        <Group spacing="xs">
          <Title order={5} weight={500}>
            {props.label}
          </Title>
          {props.weight && (
            <Text size="xs" color="dimmed">
              {props.weight >= 1000 ? `${props.weight * 0.001}kg` : `${props.weight}g`}
            </Text>
          )}
        </Group>
        <TagList tags={props.tags} />
      </Group>

      {props.description && (
        <Text className={classes.textSelect} size="sm">
          {props.description}
        </Text>
      )}

      <ButtonGroup image={props.image} isLuaVisible={isLuaVisible} toggleLua={toggleLua} />

      {isLuaVisible && (
        <Prism className={classes.textSelect} language="python">
          {getLuaItem(props)}
        </Prism>
      )}
    </Stack>
  );
};

export default Details;
