import type { NextPage } from 'next';
import { HoverCard } from '@mantine/core';
import { IItem } from '../../interfaces/item';
import Item from './Item';
import Details from './Details';

const ItemHover: NextPage<IItem> = (props: IItem) => {
  return (
    <HoverCard withArrow width="320px">
      <HoverCard.Target>
        <div>
          <Item src={props.src} label={props.label} />
        </div>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Details {...props} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default ItemHover;
