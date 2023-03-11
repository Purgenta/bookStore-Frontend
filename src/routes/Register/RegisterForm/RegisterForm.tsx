import style from "../../Login/LoginForm/LoginForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import validate from "./registerFormValidation";
type RegisterFormProps = {
  submitHandler: (email: string, password: string) => unknown;
  emailError?: string;
  passwordError?: string;
};
export interface FormValues {
  email: string;
  password: string;
  name: string;
  lastName: string;
}
const RegisterForm = ({
  submitHandler,
  emailError,
  passwordError,
}: RegisterFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validate,
    onSubmit: (values) => {
      submitHandler(values.email, values.password);
    },
  });
  const { touched, errors, isSubmitting } = formik;
  return (
    <div className={style["register-form__wrapper"]}>
      <form
        className={style["authentication-form"]}
        onSubmit={formik.handleSubmit}
      >
        <label className={style["auth-label"]} id="email">
          Email
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faUser} />
          <input
            className={style["auth-input"]}
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your name"
          />
        </div>
        {errors.name && touched.name && (
          <p className={style["error-message"]}>{errors.name}</p>
        )}
        <label className={style["auth-label"]} id="email">
          Last name
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faUser} />
          <input
            className={style["auth-input"]}
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your last name"
          />
        </div>
        {errors.lastName && touched.lastName && (
          <p className={style["error-message"]}>{errors.lastName}</p>
        )}
        <label className={style["auth-label"]} id="email">
          Email
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            className={style["auth-input"]}
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email adress"
          />
        </div>
        {emailError && !touched.email && (
          <p className={style["error-message"]}>{emailError}</p>
        )}
        {errors.email && touched.email && (
          <p className={style["error-message"]}>{errors.email}</p>
        )}
        <label className={style["auth-label"]} id="password">
          Password
        </label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faKey} />
          <input
            className={style["auth-input"]}
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
          />
        </div>
        {passwordError && !touched.password && (
          <p className={style["error-message"]}>{passwordError}</p>
        )}
        {errors.password && touched.password && (
          <p className={style["error-message"]}>{errors.password}</p>
        )}
        <button
          type="submit"
          className={style["submit-btn"]}
          disabled={isSubmitting || !formik.isValid}
        >
          Register
        </button>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
