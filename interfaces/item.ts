export interface IItem {
  id: number;
  name: string;
  label: string;
  description?: string;
  image: string;
  tags?: number[];
  weight?: number;
}
