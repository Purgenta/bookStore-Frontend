import style from "../Login/Login.module.css";
import axios from "../../axios/publicAxiosInstance";
import axiosCore from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../errors/errorResponse";
import RegisterForm from "./RegisterForm/RegisterForm";
type RegisterError = {
  errors: {
    email?: ErrorResponse | null;
    password?: ErrorResponse | null;
  };
};
const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<RegisterError>({
    errors: { email: null },
  });
  const submitHandler = (email: string, password: string) => {
    const submitLoginData = async () => {
      try {
        await axios.post(`account/register`, {
          password,
          email,
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
              setErrors((prev) => ({
                ...prev,
                errors: { email: errors.email },
              }));
            }
          }
        }
      }
    };
    submitLoginData();
  };
  return (
    <section className={style["authentication"]}>
      {errors && (
        <p className={style["error-message"]}>{errors.errors.email?.msg}</p>
      )}
      <RegisterForm submitHandler={submitHandler} />
    </section>
  );
};

export default Register;
