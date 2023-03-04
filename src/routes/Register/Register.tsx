import style from "./Register.module.css";
import Input from "../../components/Input/Input";
import axios from "../../axios/publicAxiosInstance";
import axiosCore from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../errors/errorResponse";
type RegisterError = {
  errors: {
    email?: ErrorResponse;
  };
};
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
const Register = () => {
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const navigate = useNavigate();
  const emailChangeHandler = (value: string) => {
    const email = value.trim();
    setEmail((prev) => {
      return {
        ...prev,
        currentValue: email,
        isValid: true,
      };
    });
  };
  const passwordChangeHandler = (value: string) => {
    const password = value.trim();
    if (password.length >= 5 && password.length <= 16) {
      setPassword((prev) => {
        return { ...prev, currentValue: password, isValid: true };
      });
    }
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.isValid && email.isValid) {
      const submitLoginData = async () => {
        try {
          await axios.post(`account/register`, {
            password: password.currentValue,
            email: email.currentValue,
            name: "Nikola",
            lastName: `Todorovic`,
          });
          navigate("/login");
        } catch (error) {
          if (axiosCore.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 400) {
              const { errors } = axiosError?.response?.data as RegisterError;
              if (errors.email) {
                setEmail((prev) => ({
                  ...prev,
                  error: errors.email?.msg as string,
                }));
              }
            }
          }
        }
      };
      submitLoginData();
    }
  };
  return (
    <section className={style["register"]}>
      <div className={style["register-form__wrapper"]}>
        <form onSubmit={submitHandler} className={style["registration-form"]}>
          {email.error && (
            <span className={style["input-error"]}>{email.error}</span>
          )}
          <Input
            input={{
              id: "email",
              type: "text",
              onInputChange: emailChangeHandler,
            }}
            labelProps={{ description: "Email" }}
          />
          {password.error && ""}
          <Input
            input={{
              id: "password",
              type: "password",
              onInputChange: passwordChangeHandler,
            }}
            labelProps={{ description: "Password" }}
            tooltip={{
              description: "Your password must be between 5 and 16 characters",
            }}
          />
          <button
            type="submit"
            className={style["form-submit__btn"]}
            disabled={!(email.isValid && password.isValid)}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
