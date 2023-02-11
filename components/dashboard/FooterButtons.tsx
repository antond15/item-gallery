import type { NextPage } from 'next';
import { Group, Button, ActionIcon } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { ISubmit } from '@interfaces';
import { accept, reject } from '@utils/submitForm';

type Props = {
  removeRequest: (id: number) => void;
  values: ISubmit & { id: number };
};

const FooterButtons: NextPage<Props> = (props) => {
  return (
    <Group position="apart">
      <Group spacing="xs">
        <ActionIcon
          color="green"
          variant="light"
          onClick={() => {
            accept(props.values, props.removeRequest);
          }}
        >
          <IconCheck />
        </ActionIcon>
        <ActionIcon
          color="red"
          variant="light"
          onClick={() => {
            reject(props.values.id, props.removeRequest);
          }}
        >
          <IconX size={20} />
        </ActionIcon>
      </Group>
      <Button type="submit" variant="light" color="cyan" size="xs">
        Apply changes
      </Button>
    </Group>
  );
};

export default FooterButtons;
