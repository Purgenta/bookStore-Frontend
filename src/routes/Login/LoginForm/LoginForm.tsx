import React from "react";
import validate from "./loginFormValidation";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import style from "./LoginForm.module.css";
type LoginFormProps = {
  submitHandler: (values: FormValues) => unknown;
};
export interface FormValues {
  email: string;
  password: string;
}
const LoginForm = ({ submitHandler }: LoginFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validate,
    validateOnMount: true,
    onSubmit: async (values) => {
      await submitHandler(values);
    },
  });
  console.log(formik.isValid);
  const { errors, touched } = formik;
  return (
    <div className={style["login-form_wrapper"]}>
      <form
        onSubmit={formik.handleSubmit}
        className={style["authentication-form"]}
      >
        <label className={style["auth-label"]} id="email">
          Email
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faUser} />
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={style["auth-input"]}
            placeholder="Enter your email"
            autoComplete="username"
            type="email"
            name="email"
            required
          />
        </div>
        {errors.email && touched.email && (
          <p className={style["error-message"]}>{errors.email}</p>
        )}
        <label className={style["auth-label"]} id="password">
          Password
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faKey} />
          <input
            placeholder="Enter you password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={style["auth-input"]}
            autoComplete="current-password"
            type="password"
            name="password"
            required
          />
        </div>
        {errors.password && touched.password && (
          <p className={style["error-message"]}>{errors.password}</p>
        )}
        <button
          type="submit"
          className={style["submit-btn"]}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Login
        </button>
        <Link to="/register">Don't have an account?</Link>
      </form>
    </div>
  );
};

export default LoginForm;
