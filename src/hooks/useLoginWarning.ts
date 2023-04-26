import { useDispatch } from "react-redux";
import { addNotification } from "../redux/notification/notificationSlice";
import { AppDispatch } from "../redux/store";
import { nanoid } from "@reduxjs/toolkit";
const useLoginWarning = () => {
  return addNotification({
    id: nanoid(5),
    message: "You have to login first",
    notificationType: "ERROR",
  });
};
export default useLoginWarning;
