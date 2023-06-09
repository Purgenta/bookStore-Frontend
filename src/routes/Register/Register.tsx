import style from "../Login/Login.module.css";
import axios from "../../axios/publicAxiosInstance";
import axiosCore from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../errors/errorResponse";
import RegisterForm from "./RegisterForm/RegisterForm";
import { useDispatch } from "react-redux";
type RegisterError = {
  errors: {
    email?: ErrorResponse | null;
    password?: ErrorResponse | null;
  };
};
import { FormValues } from "./RegisterForm/RegisterForm";
import { addNotification } from "../../redux/notification/notificationSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<RegisterError>({
    errors: { email: null },
  });
  const submitHandler = (formValues: FormValues) => {
    const submitLoginData = async () => {
      try {
        await axios.post(`account/register`, formValues);
        dispatch(
          addNotification({
            message: "Successfull registration",
            notificationType: "SUCCESS",
          })
        );
        navigate("/login");
      } catch (error) {
        dispatch(
          addNotification({
            message: "Error during registration",
            notificationType: "ERROR",
          })
        );
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
        <h2 className={style["error-message"]}>{errors.errors.email?.msg}</h2>
      )}
      <RegisterForm submitHandler={submitHandler} />
    </section>
  );
};

export default Register;
