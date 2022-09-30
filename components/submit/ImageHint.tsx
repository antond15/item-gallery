import type { NextPage } from 'next';
import { Code, Group, Text, Tooltip, Stack, ActionIcon } from '@mantine/core';
import { FaQuestionCircle } from 'react-icons/fa';
import { images } from '../../next.config';

const ImageHint: NextPage = () => {
  const imageList = (
    <Stack spacing={3}>
      {images?.domains?.map((image, index) => (
        <Code key={index}>{image}</Code>
      ))}
    </Stack>
  );

  return (
    <Group spacing="xs">
      <Text sx={{ lineHeight: 1.2 }}>Must be hosted on an allowed domain</Text>
      <Tooltip label={imageList} color="gray" sx={{ padding: 3 }}>
        <ActionIcon size={14} variant="transparent" color="dark">
          <FaQuestionCircle />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default ImageHint;
