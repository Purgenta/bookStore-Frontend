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
    const response = await axios.get("/authentication/refreshToken", {
      withCredentials: true,
    });
    const {
      data: { accessToken },
      data: { role },
    } = response;
    dispatch(updateAccessToken(accessToken, role));
    return { accessToken, role };
  };
  return getAccessToken;
};
export default useRefreshToken;
