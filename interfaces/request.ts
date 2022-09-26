export interface IRequest {
  id: number;
  label: string;
  description?: string;
  image: string;
  tags?: number[];
  userId: string;
  submitedAt: string;
}
