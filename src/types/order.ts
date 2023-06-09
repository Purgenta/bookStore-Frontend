import { Product } from "./product";
type OrderStatus = "DELIVERED" | "ONGOING" | "CANCELED";

type OrderReview = {
  comment: string;
  rating: number;
};
export type Order = {
  id: number;
  order_status: OrderStatus;
  ordered_at: string;
  orderReview: null | OrderReview;
  cart: {
    cartItems: Product[];
    order_status: OrderStatus;
  };
};
