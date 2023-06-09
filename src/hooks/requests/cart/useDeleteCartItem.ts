import { useDispatch } from "react-redux";
import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import { addNotification } from "../../../redux/notification/notificationSlice";

const useDeleteCartItem = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const deleteCartItem = async (
    product_id: number,
    onSuccess: () => unknown
  ) => {
    try {
      await axios.post("cart/deleteCartItem", {
        product_id,
      });
      onSuccess();
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to remove product ",
          notificationType: "ERROR",
        })
      );
    }
  };
  return deleteCartItem;
};
export default useDeleteCartItem;
