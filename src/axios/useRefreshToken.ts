import axios from "./publicAxiosInstance";
import { useDispatch } from "react-redux";
import { updateAccessToken } from "../redux/authentication/authenticationSlice";
type Refresh = {
  accessToken: string;
  role: string;
};
const useRefreshToken = () => {
  const dispatch = useDispatch();
  const getAccessToken = async (): Promise<Refresh> => {
    const response = await axios.get("/account/refreshToken", {
      withCredentials: true,
    });
    const { accessToken, role } = response.data;
    dispatch(updateAccessToken(accessToken, role));
    return { accessToken, role };
  };
  return getAccessToken;
};
export default useRefreshToken;
