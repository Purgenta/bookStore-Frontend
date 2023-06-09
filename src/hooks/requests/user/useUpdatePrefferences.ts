import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../redux/notification/notificationSlice";
const useUpdatePrefferences = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const setPrefferences = async (genre_id: number) => {
    try {
      await axios.post("user/prefferences", { genre_id });
      dispatch(
        addNotification({
          message: "Succesfully set prefference",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error setting prefferences",
          notificationType: "ERROR",
        })
      );
    }
  };
  return setPrefferences;
};
export default useUpdatePrefferences;
