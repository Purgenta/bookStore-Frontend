import { useState } from "react";
import axios from "../../axios/publicAxiosInstance";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import LoginForm from "./LoginForm/LoginForm";
import {
  Authentication,
  updateAccessToken,
} from "../../redux/authentication/authenticationSlice";
import { useDispatch } from "react-redux";
import axiosCore, { AxiosError } from "axios";
const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sendLoginRequest = (email: string, password: string) => {
    const loginRequest = async () => {
      try {
        const response = await axios.post("account/login", {
          email,
          password,
        });
        const userData = response.data as Omit<
          Authentication,
          "isAuthenticated"
        >;
        dispatch(updateAccessToken(userData.accessToken!, userData.role!));
        navigate("/test");
      } catch (error) {
        if (!axiosCore.isAxiosError(error)) return;
        error as AxiosError;
        if (error.response?.status === 400) {
          setError("Invalid login parameters");
        } else {
          setError("There was a problem communicating with the server");
        }
      }
    };
    loginRequest();
  };
  return (
    <section className={style["authentication"]}>
      <LoginForm onSubmit={sendLoginRequest} />
    </section>
  );
};

export default Login;
