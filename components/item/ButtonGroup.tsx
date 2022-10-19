import type { NextPage } from 'next';
import { Group, ActionIcon } from '@mantine/core';
import { FaSave, FaExternalLinkAlt } from 'react-icons/fa';

type Props = {
  image: string;
};

const ButtonGroup: NextPage<Props> = (props) => {
  return (
    <Group spacing={4}>
      <ActionIcon component="a" href={props.image} download variant="filled" color="green">
        <FaSave />
      </ActionIcon>
      <ActionIcon
        component="a"
        href={props.image}
        target="_blank"
        rel="noreferrer noopener"
        variant="filled"
      >
        <FaExternalLinkAlt size={14} />
      </ActionIcon>
    </Group>
  );
};

export default ButtonGroup;
