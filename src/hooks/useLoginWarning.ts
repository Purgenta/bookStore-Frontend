import { useDispatch } from "react-redux";
import { addNotification } from "../redux/notification/notificationSlice";
const useLoginWarning = () => {
  const dispatch = useDispatch();
  return () =>
    dispatch(
      addNotification({
        message: "You have to login first",
        notificationType: "ERROR",
      })
    );
};
export default useLoginWarning;
