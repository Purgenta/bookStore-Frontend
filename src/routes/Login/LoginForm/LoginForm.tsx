import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import style from "./LoginForm.module.css";
type LoginFormProps = {
  onSubmit: (email: string, password: string) => unknown;
};
const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setEmail((prev) => ({ ...prev, currentValue: value, isValid: true }));
  };
  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const password = event.target.value.trim();
    if (password.length >= 5 && password.length <= 16) {
      setPassword((prev) => ({
        ...prev,
        currentValue: password,
        isValid: true,
      }));
    } else {
      setPassword((prev) => ({ ...prev, isValid: false }));
    }
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password.isValid && email.isValid) {
      onSubmit(email.currentValue, password.currentValue);
    }
  };
  return (
    <div className={style["login-form_wrapper"]}>
      <form onSubmit={handleSubmit} className={style["authentication-form"]}>
        <label className={style["auth-label"]} id="email">
          Email
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faUser} />
          <input
            onChange={emailChangeHandler}
            className={style["auth-input"]}
            placeholder="Enter your email"
            autoComplete="username"
            type="email"
            required
          />
        </div>
        <label className={style["auth-label"]} id="password">
          Password
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faKey} />
          <input
            placeholder="Enter you password"
            onChange={passwordChangeHandler}
            className={style["auth-input"]}
            autoComplete="current-password"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className={style["submit-btn"]}
          disabled={!(email.isValid && password.isValid)}
        >
          Login
        </button>
        <Link to="/register">Don't have an account?</Link>
      </form>
    </div>
  );
};

export default LoginForm;
