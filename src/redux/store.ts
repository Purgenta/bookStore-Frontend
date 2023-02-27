import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "./authentication/authenticationSlice";
const store = configureStore({
  reducer: {
    authentication: authenticationSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
