import type { NextPage } from 'next';
import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconBraces, IconDeviceFloppy, IconExternalLink } from '@tabler/icons';

type Props = {
  image: string;
  isLuaVisible: boolean;
  toggleLua: () => void;
};

const ButtonGroup: NextPage<Props> = (props) => {
  return (
    <Group spacing={4}>
      <Tooltip label="Download image" openDelay={200}>
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
      </Tooltip>

      <Tooltip
        onClick={() => props.toggleLua()}
        label={`${props.isLuaVisible ? 'Hide' : 'Show'} inventory data`}
        openDelay={200}
      >
        <ActionIcon variant="filled" color="orange">
          <IconBraces size={20} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default ButtonGroup;
