import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import { AxiosInstance } from "axios";
const FAVOURITES_URL = "user/favourites";
const FAVOURITE_ADD = "user/addFavourite";
const FAVOURITE_REMOVE = "user/removeFavourite";
export const getFavourites = createAsyncThunk(
  "fetch/favourites",
  async (axios: AxiosInstance) => {
    try {
      return (await axios.get(FAVOURITES_URL)).data as Product[];
    } catch (error) {}
  }
);
interface Axios {
  axios: AxiosInstance;
}
interface AdjustFavouriteProduct extends Axios {
  product_id: number;
}
export const addFavouriteProduct = createAsyncThunk(
  "add/favourite",
  async (addFavouriteProduct: AdjustFavouriteProduct) => {
    const { axios, product_id } = addFavouriteProduct;
    try {
      const addRequest = await axios.post(FAVOURITE_ADD, {
        product_id,
      });
      return (await addRequest.data) as Product[];
    } catch (error) {}
  }
);
export const removeFavouriteProduct = createAsyncThunk(
  "remove/favourite",
  async (removeFavouriteProduct: AdjustFavouriteProduct) => {
    const { axios, product_id } = removeFavouriteProduct;
    try {
      const addRequest = await axios.post(FAVOURITE_REMOVE, {
        product_id,
      });
      return (await addRequest.data) as Product[];
    } catch (error) {}
  }
);
const favouriteProducts: Product[] = [];
const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favouriteProducts: favouriteProducts,
    isLoaded: false,
  },
  reducers: {
    setFavourites: {
      reducer: (state, action: PayloadAction<Product[]>) => {
        state.favouriteProducts = action.payload;
        return state;
      },
      prepare: (favourites: Product[]) => {
        return { payload: favourites };
      },
    },
  },
  extraReducers(builder) {
    builder.addCase(getFavourites.fulfilled, (state, action) => {
      state.favouriteProducts = action.payload!;
    });
    builder.addCase(getFavourites.rejected, (state) => {
      state.favouriteProducts = [];
    });
    builder.addCase(addFavouriteProduct.fulfilled, (state, action) => {
      state.favouriteProducts = action.payload!;
    });
    builder.addCase(removeFavouriteProduct.fulfilled, (state, action) => {
      state.favouriteProducts = action.payload!;
    });
  },
});
export default favouritesSlice.reducer;
export const favouritesSelector = (root: RootState) => root.favourites;
export const favouritesCount = (root: RootState) =>
  root.favourites.favouriteProducts.length;
export const { setFavourites } = favouritesSlice.actions;
