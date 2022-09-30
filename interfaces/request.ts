export interface IRequest {
  id: number;
  name: string;
  label: string;
  description?: string;
  image: string;
  tags?: number[];
  weight?: number;
  userId: string;
  submitedAt: string;
}
