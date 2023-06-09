import { UserNotification } from "../../components/Notifications/Notification/Notification";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { nanoid } from "@reduxjs/toolkit";
const initialNotifications: UserNotification[] = [];
let payload: Omit<UserNotification, "id">;
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
      reducer: (state, action: PayloadAction<typeof payload>) => {
        state.notifications.push({ ...action.payload, id: nanoid(5) });
        return state;
      },
      prepare: (notification: typeof payload) => {
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
