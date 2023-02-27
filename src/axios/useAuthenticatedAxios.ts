import { useEffect } from "react";
import axios from "./publicAxiosInstance";
import { useSelector } from "react-redux";
import { authenticationSelector } from "../redux/authentication/authenticationSlice";
import useRefreshToken from "./useRefreshToken";
const useAuthenticetedAxios = () => {
  const authentication = useSelector(authenticationSelector);
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${authentication.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest.sent) {
          previousRequest.sent = true;
          const refresh = await refreshToken();
          previousRequest.headers[
            "Authorization"
          ] = `Bearer ${refresh.accessToken}`;
          return axios(previousRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [authentication, refreshToken]);
  return axios;
};
export default useAuthenticetedAxios;
