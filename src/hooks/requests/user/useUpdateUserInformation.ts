import { useState } from "react";
import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../redux/notification/notificationSlice";
import { isAxiosError } from "axios";
type Props = {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
};
const useUpdateUserInformation = (onSuccess: () => unknown) => {
  const [responseError, setResponseError] = useState("");
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const updateInformation = async (data: Props) => {
    try {
      await axios.put("account/updateInformation", {
        ...data,
      });
      setResponseError("");
      dispatch(
        addNotification({
          message: "Credentials updated successfully",
          notificationType: "SUCCESS",
        })
      );
      onSuccess();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          dispatch(
            addNotification({
              message: "Email is already taken",
              notificationType: "ERROR",
            })
          );
          setResponseError("Email is already taken by another user");
        }
      } else setResponseError("Error while trying to update user information");
    }
  };
  return { responseError, setResponseError, updateInformation };
};
export default useUpdateUserInformation;
