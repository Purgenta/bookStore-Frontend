import { User } from "./user";
export type Review = {
  comment: string;
  rating: number;
  user: User;
  id: number;
};
