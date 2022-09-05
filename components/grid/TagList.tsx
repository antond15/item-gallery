import type { NextPage } from 'next';
import { useState } from 'react';
import { Popover, Button, Stack, Badge } from '@mantine/core';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

type Props = {
  tags: string[];
};

const TagList: NextPage<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover opened={isOpen} withArrow>
      <Popover.Target>
        <Button
          size="xs"
          radius="xl"
          variant="light"
          color="cyan"
          compact
          onClick={() => setIsOpen(!isOpen)}
          rightIcon={isOpen ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
        >
          {props.tags.length} {props.tags.length === 1 ? 'tag' : 'tags'}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing={4}>
          {props.tags.map((tag, index) => (
            <Badge key={index} size="xs">
              {tag}
            </Badge>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagList;
