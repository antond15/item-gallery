import type { NextPage } from 'next';
import { useState, useContext } from 'react';
import { Popover, Button, Stack, Badge } from '@mantine/core';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { TagsContext } from '../grid/index';

type Props = {
  tags?: number[];
};

const TagList: NextPage<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const tagData = useContext(TagsContext);
  const itemTags = props.tags?.filter((tag) => tagData[tag]) || []; // Filter out tags that don't exist

  return (
    <Popover opened={isOpen} withArrow>
      <Popover.Target>
        <Button
          size="xs"
          radius="xl"
          variant="light"
          color="cyan"
          compact
          onClick={() => itemTags.length > 0 && setIsOpen(!isOpen)}
          rightIcon={
            itemTags.length > 0 && (isOpen ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />)
          }
        >
          {itemTags.length} {itemTags.length === 1 ? 'tag' : 'tags'}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing={4}>
          {itemTags.map((tag, index) => (
            <Badge key={index} size="xs" color={tagData[tag].color}>
              {tagData[tag].label}
            </Badge>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagList;
