import { UserNotification } from "../../components/Notifications/Notification/Notification";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const initialNotifications: UserNotification[] = [];
const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: initialNotifications,
  },
  reducers: {
    removeNotification: (state) => {
      state.notifications.shift();
    },
    addNotification: {
      reducer: (state, action: PayloadAction<UserNotification>) => {
        state.notifications.push(action.payload);
        return state;
      },
      prepare: (notification: UserNotification) => {
        return { payload: notification };
      },
    },
  },
});
export default notificationSlice.reducer;
export const notificationSelector = (root: RootState) =>
  root.notifications.notifications;
export const { addNotification, removeNotification } =
  notificationSlice.actions;
