import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
type ProductImage = {
  image_url: string;
};
export type FavouriteProduct = {
  id: number;
  page_number: number;
  price: number;
  productImages: ProductImage[];
  publishing_date: string;
  quantity: number;
  title: string;
};
const favouriteProducts: FavouriteProduct[] = [];
const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favouriteProducts,
  },
  reducers: {
    setFavourites: {
      reducer: (state, action: PayloadAction<FavouriteProduct[]>) => {
        state.favouriteProducts = action.payload;
        return state;
      },
      prepare: (favourites: FavouriteProduct[]) => {
        return { payload: favourites };
      },
    },
  },
});
export default favouritesSlice.reducer;
export const favouritesSelector = (root: RootState) => root.favourites;
export const favouritesCount = (root: RootState) =>
  root.favourites.favouriteProducts.length;
export const { setFavourites } = favouritesSlice.actions;
