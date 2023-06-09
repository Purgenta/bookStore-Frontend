import useAuthenticatedAxios from "../axios/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/notification/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
const useUpdateCartQuantity = (product_id: number) => {
  const dispatch = useDispatch();
  const axios = useAuthenticatedAxios();
  return async (quantity: number) => {
    try {
      await axios.post("cart/addCartItem", {
        product_id,
        quantity,
      });
      dispatch(
        addNotification({
          message: "Item added successfully",
          notificationType: "SUCCESS",
        })
      );
    } catch (error: any) {
      let message = "Issue adding item to the cart";
      if (isAxiosError(error)) {
        message = error.response?.data || message;
      }
      dispatch(
        addNotification({
          message,
          notificationType: "ERROR",
        })
      );
    }
  };
};
export default useUpdateCartQuantity;
