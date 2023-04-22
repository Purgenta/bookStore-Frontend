import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authentication/authenticationSlice";
import cartSlice from "./cart/cartSlice";
import favouritesSlice from "./favourites/favouritesSlice";
const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    cart: cartSlice,
    favourites: favouritesSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
