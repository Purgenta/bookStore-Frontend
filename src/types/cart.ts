import { ProductImage, Discount } from "./product";
export type CartItem = {
  product_id: number;
  quantity: number;
};
export type CartResponse = {
  cartItem: CartItem[];
  id: number;
  title: string;
  quantity: number;
  price: number;
  sale: Discount | null;
  productImages: ProductImage[];
};
