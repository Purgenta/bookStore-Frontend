import React, { useState } from "react";
import style from "./Login.module.css";
import Input from "../../components/Input/Input";
import axios from "../../axios/publicAxiosInstance";
import { useNavigate } from "react-router-dom";
import {
  Authentication,
  updateAccessToken,
} from "../../redux/authentication/authenticationSlice";
import { useDispatch } from "react-redux";
import axiosCore, { AxiosError } from "axios";
type InputState = {
  isValid: boolean;
  currentValue: string;
  error: string | null;
};
const initialState: InputState = {
  isValid: false,
  currentValue: "",
  error: null,
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [error, setError] = useState("");
  const emailChangeHandler = (value: string) =>
    setEmail((prev) => ({ ...prev, currentValue: value, isValid: true }));
  const passwordChangeHandler = (value: string) => {
    const password = value.trim();
    if (password.length >= 5 && password.length <= 16) {
      setPassword((prev) => ({
        ...prev,
        currentValue: password,
        isValid: true,
      }));
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(email.isValid && password.isValid)) console.log("Not valid");
    if (email.isValid && password.isValid) {
      const loginRequest = async () => {
        try {
          const response = await axios.post("account/login", {
            email: email.currentValue,
            password: password.currentValue,
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
    }
  };
  return (
    <section className={style["login"]}>
      <div className={style["login-form_wrapper"]}>
        {error && <p className={style["error-message"]}>{error}</p>}
        <form onSubmit={handleSubmit} className={style["login-form"]}>
          <Input
            input={{
              id: "email",
              onInputChange: emailChangeHandler,
              type: "email",
            }}
            labelProps={{ description: "Email" }}
          ></Input>
          <Input
            input={{
              id: "password",
              onInputChange: passwordChangeHandler,
              type: "password",
              autoComplete: "current-password",
            }}
            labelProps={{ description: "Password" }}
          ></Input>
          <button
            type="submit"
            className={style["submit-btn"]}
            disabled={!(email.isValid && password.isValid)}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
