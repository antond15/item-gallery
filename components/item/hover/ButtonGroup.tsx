import type { NextPage } from 'next';
import { Group, ActionIcon } from '@mantine/core';
import { IconBraces, IconDeviceFloppy } from '@tabler/icons-react';

type Props = {
  image: string;
  isLuaVisible: boolean;
  toggleLua: () => void;
};

const ButtonGroup: NextPage<Props> = (props) => {
  return (
    <Group spacing={4}>
      <ActionIcon
        component="a"
        href={props.image}
        target="_blank"
        rel="noreferrer noopener"
        variant="filled"
        color="green"
      >
        <IconDeviceFloppy size={20} />
      </ActionIcon>

      <ActionIcon variant="filled" color="orange" onClick={props.toggleLua}>
        <IconBraces size={20} />
      </ActionIcon>
    </Group>
  );
};

export default ButtonGroup;
