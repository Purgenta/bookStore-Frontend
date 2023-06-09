import { useDispatch } from "react-redux";
import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import { addNotification } from "../../../redux/notification/notificationSlice";

const useSetCartItem = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const setCartItem = async (
    quantity: number,
    product_id: number,
    onSuccess: (...args: any[]) => unknown
  ) => {
    try {
      await axios.post("cart/setCartItem", {
        quantity,
        product_id,
      });
      dispatch(
        addNotification({
          message: "Successfully updated quantity",
          notificationType: "SUCCESS",
        })
      );
      onSuccess();
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while updating quantity",
          notificationType: "ERROR",
        })
      );
    }
  };
  return setCartItem;
};
export default useSetCartItem;
