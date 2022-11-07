import type { NextPage } from 'next';
import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { MdSave, MdOpenInNew, MdCode } from 'react-icons/md';

type Props = {
  image: string;
};

const ButtonGroup: NextPage<Props> = (props) => {
  return (
    <Group spacing={4}>
      <Tooltip label="Download image" openDelay={200}>
        <ActionIcon component="a" href={props.image} download variant="filled" color="green">
          <MdSave size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Open source" openDelay={200}>
        <ActionIcon
          component="a"
          href={props.image}
          target="_blank"
          rel="noreferrer noopener"
          variant="filled"
        >
          <MdOpenInNew size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Show inventory data" openDelay={200}>
        <ActionIcon variant="filled" color="orange">
          <MdCode size={20} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default ButtonGroup;
