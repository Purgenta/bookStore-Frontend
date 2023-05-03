import style from "../../Login/LoginForm/LoginForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faKey,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import validate from "./registerFormValidation";
export interface FormValues {
  email: string;
  password: string;
  name: string;
  last_name: string;
  phone_number: string;
}
type RegisterFormProps = {
  submitHandler: (formValues: FormValues) => unknown;
  emailError?: string;
  passwordError?: string;
};
const RegisterForm = ({
  submitHandler,
  emailError,
  passwordError,
}: RegisterFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validate,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
  const { touched, errors, isSubmitting } = formik;
  return (
    <div className={style["register-form__wrapper"]}>
      <form
        className={style["authentication-form"]}
        onSubmit={formik.handleSubmit}
      >
        <label className={style["auth-label"]} htmlFor={"name"}>
          Name
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
            name="last_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your last name"
          />
        </div>
        {errors["last_name"] && touched["last_name"] && (
          <p className={style["error-message"]}>{errors["last_name"]}</p>
        )}
        <label className={style["auth-label"]}>Phone number</label>
        <div className={style["input-wrapper"]}>
          <FontAwesomeIcon icon={faPhone} />
          <input
            className={style["auth-input"]}
            name="phone_number"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your phone number"
          />
        </div>
        {errors.phone_number && touched.phone_number && (
          <p className={style["error-message"]}>{errors["phone_number"]}</p>
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
