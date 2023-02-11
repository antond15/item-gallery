import type { NextPage } from 'next';
import { Code, Group, Text, Tooltip, Stack, ActionIcon } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';

type Props = {
  domains: string[];
};

const ImageHint: NextPage<Props> = (props) => {
  const ImageList = (
    <Stack spacing={3}>
      {props.domains.map((image, index) => (
        <Code key={index}>{image}</Code>
      ))}
    </Stack>
  );

  return (
    <Group spacing={5}>
      <Text lh={1.2}>Musí být umístěn na povolené doméně</Text>
      <Tooltip label={ImageList} position="top" p={3}>
        <ActionIcon size={14} variant="light" color="cyan">
          <IconQuestionMark stroke={4} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default ImageHint;
