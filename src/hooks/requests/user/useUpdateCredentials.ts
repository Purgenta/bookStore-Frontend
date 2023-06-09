import { useState } from "react";
import useAuthenticatedAxios from "../../../axios/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { addNotification } from "../../../redux/notification/notificationSlice";
import { isAxiosError } from "axios";
type Props = {
  currentPassword: string;
  newPassword: string;
};
const useUpdateCredentials = () => {
  const [responseError, setResponseError] = useState("");
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const updateCredentials = async (data: Props) => {
    try {
      await axios.put("account/updateCredentials", {
        ...data,
      });
      setResponseError("");
      dispatch(
        addNotification({
          message: "Credentials updated successfully",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        dispatch(
          addNotification({
            message: "Your password doesn't match",
            notificationType: "ERROR",
          })
        );
        setResponseError("Your password doesn't match");
      } else setResponseError("Error while trying to update credentials");
    }
  };
  return { responseError, setResponseError, updateCredentials };
};
export default useUpdateCredentials;
