import type { NextPage } from 'next';
import { Group, ActionIcon } from '@mantine/core';
import { MdSave, MdOutlineOpenInNew } from 'react-icons/md';

type Props = {
  image: string;
};

const ButtonGroup: NextPage<Props> = (props) => {
  return (
    <Group spacing={4}>
      <ActionIcon component="a" href={props.image} download variant="filled" color="green">
        <MdSave size={20} />
      </ActionIcon>
      <ActionIcon
        component="a"
        href={props.image}
        target="_blank"
        rel="noreferrer noopener"
        variant="filled"
      >
        <MdOutlineOpenInNew size={20} />
      </ActionIcon>
    </Group>
  );
};

export default ButtonGroup;
