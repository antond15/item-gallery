import type { NextPage } from 'next';
import { useState, useContext } from 'react';
import { Popover, Button, Stack, Badge } from '@mantine/core';
import { TagsContext } from './';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

type Props = {
  tags: number[];
};

const TagList: NextPage<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const tagData = useContext(TagsContext);

  const tags = props.tags.filter((tagId) => tagId < tagData.length);

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
            tags.length > 0 && (isOpen ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />)
          }
        >
          {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing={4}>
          {tags.map((tag, index) => (
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
