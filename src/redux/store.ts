import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authentication/authenticationSlice";
import favouritesSlice from "./favourites/favouritesSlice";
import notificationSlice from "./notification/notificationSlice";
const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
    favourites: favouritesSlice,
    notifications: notificationSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
