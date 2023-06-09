import { useDispatch } from "react-redux";
import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import { addNotification } from "../../../redux/notification/notificationSlice";
const useCheckout = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const checkout = async () => {
    try {
      const response = axios.post("cart/checkout");
      dispatch(
        addNotification({
          message: "Order received",
          notificationType: "SUCCESS",
        })
      );
      Promise.resolve(response);
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error receiving the order",
          notificationType: "ERROR",
        })
      );
      Promise.reject(error);
    }
  };
  return checkout;
};
export default useCheckout;
