import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
type CartProduct = {
  price: number;
  quantity: number;
  product_img: string;
};
export type Cart = {
  cartItems: CartProduct[];
};
const initialState: Cart = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});
export default cartSlice.reducer;
export const cartSelector = (root: RootState) => root.cart;
