import { Product } from "./product";
type OrderStatus = "DELIVERED" | "ONGOING" | "CANCELED";

type OrderReview = {
  comment: string;
  rating: number;
};
export type Order = {
  id: number;
  orderStatus: OrderStatus;
  orderedAt: string;
  orderReview: null | OrderReview;
  cart: {
    cartItems: Product[];
    orderStatus: OrderStatus;
  };
};
