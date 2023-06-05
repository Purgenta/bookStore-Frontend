import { useEffect } from "react";
import { axiosPrivateInstance } from "./publicAxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticationSelector,
  invalidateAuthentication,
  updateAccessToken,
} from "../redux/authentication/authenticationSlice";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "./useRefreshToken";
const useAuthenticatedAxios = () => {
  const authentication = useSelector(authenticationSelector);
  const refreshToken = useRefreshToken();
  const dispatch = useDispatch();
  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"] && authentication.accessToken) {
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
    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest.sent) {
          previousRequest.sent = true;
          try {
            const refresh = await refreshToken();
            previousRequest.headers[
              "Authorization"
            ] = `Bearer ${refresh.accessToken}`;
            return axiosPrivateInstance(previousRequest);
          } catch (exception) {
            dispatch(invalidateAuthentication());
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [authentication, refreshToken]);
  return axiosPrivateInstance;
};
export default useAuthenticatedAxios;
