import type { NextPage } from 'next';
import { useState } from 'react';
import { Group, Button, ActionIcon } from '@mantine/core';
import { accept, reject } from '@utils/request';
import { MdCheck, MdClose } from 'react-icons/md';
import { IRequest } from '@interfaces';

type Props = {
  removeRequest: (id: number) => void;
} & IRequest;

const FooterButtons: NextPage<Props> = (props) => {
  const initialValues = {
    name: props.name,
    label: props.label,
    description: props.description,
    image: props.image,
    tags: props.tags,
    weight: props.weight,
  };

  const [values, setValues] = useState(initialValues);

  return (
    <Group position="apart">
      <Group spacing="xs">
        <ActionIcon
          color="green"
          variant="light"
          onClick={() => {
            accept(
              {
                id: props.id,
                name: values.name,
                label: values.label,
                description: values.description,
                image: values.image,
                tags: values.tags,
                weight: values.weight,
              },
              props.removeRequest
            );
          }}
        >
          <MdCheck size={20} />
        </ActionIcon>
        <ActionIcon
          color="red"
          variant="light"
          onClick={() => {
            reject(props.id, props.removeRequest);
          }}
        >
          <MdClose size={20} />
        </ActionIcon>
      </Group>
      <Button type="submit" variant="light" color="cyan" size="xs">
        Apply changes
      </Button>
    </Group>
  );
};

export default FooterButtons;
