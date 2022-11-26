import type { NextPage } from 'next';
import { useState } from 'react';
import { Popover, Button, Stack, Badge } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import rawTags from '@data/tags.json';

type Tag = {
  label: string;
  color: string;
};

type Props = {
  tags?: number[];
};

const allTags: Tag[] = [];
rawTags.map((tag) => {
  allTags[tag.value] = {
    label: tag.label,
    color: tag.color,
  };
});

const TagList: NextPage<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // Filter out tags that doesn't exist
  const tags = props.tags?.filter((tag) => allTags[tag]) || [];

  return (
    <Popover opened={isOpen} withArrow>
      <Popover.Target>
        <Button
          size="xs"
          radius="xl"
          variant="light"
          color="cyan"
          compact
          onClick={() => tags.length > 0 && setIsOpen(!isOpen)}
          rightIcon={
            tags.length > 0 &&
            (isOpen ? <IconChevronUp size={12} /> : <IconChevronDown size={12} />)
          }
        >
          {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
        </Button>
      </Popover.Target>
      <Popover.Dropdown p={5} bg="dark.4">
        <Stack spacing={4}>
          {tags.map((tag, index) => (
            <Badge key={index} size="xs" color={allTags[tag].color}>
              {allTags[tag].label}
            </Badge>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagList;
