import type { IItem, ITag } from './';

export interface IGridProps {
  items: IItem[];
  tags: ITag[];
  query: string;
}
