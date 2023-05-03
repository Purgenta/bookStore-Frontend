import { useDispatch } from "react-redux";
import { addNotification } from "../redux/notification/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";
const useLoginWarning = () => {
  const dispatch = useDispatch();
  return () =>
    dispatch(
      addNotification({
        id: nanoid(5),
        message: "You have to login first",
        notificationType: "ERROR",
      })
    );
};
export default useLoginWarning;
