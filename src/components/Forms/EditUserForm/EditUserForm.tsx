import { useFormik } from "formik";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./EditUserForm.module.css";
import validate from "./editUserFormValidation";
import { useEffect, useState } from "react";
import useUpdateUserInformation from "../../../hooks/requests/user/useUpdateUserInformation";
import { Genre } from "../../../types/product";
export type EditUserFormValuesProps = {
  email: string;
  name: string;
  last_name: string;
  phone_number: string;
  emailError?: string;
  prefferences?: number;
  adress: string;
  genreId?: number;
  onSuccess: () => unknown;
};
export type FormValues = {
  email: string;
  name: string;
  last_name: string;
  phone_number: string;
  adress: string;
};
const EditUserForm = ({
  prefferences,
  adress,
  email,
  name,
  last_name,
  emailError,
  phone_number,
  onSuccess,
}: EditUserFormValuesProps) => {
  const [wasAltereted, setWasAltered] = useState(false);
  const { responseError, updateInformation } =
    useUpdateUserInformation(onSuccess);
  const formik = useFormik<FormValues>({
    initialValues: { email, name, last_name, phone_number, adress },
    onSubmit: updateInformation,
    validate,
  });
  const { touched, errors, isSubmitting, isValid, values } = formik;
  useEffect(() => {
    if (
      values.email === email &&
      values.last_name === last_name &&
      values.phone_number === phone_number &&
      values.name === name &&
      values.adress === adress
    )
      setWasAltered(false);
    else setWasAltered(true);
  }, [values]);
  return (
    <form
      className={style["edit-user__information"]}
      onSubmit={formik.handleSubmit}
    >
      <h3>{responseError}</h3>
      <label htmlFor={"name"}>Name*</label>
      <div className={style["input-wrapper"]}>
        <FontAwesomeIcon size="lg" icon={faUser} />
        <input
          className={style["auth-input"]}
          name="name"
          type="text"
          value={values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your name"
        />
      </div>
      {errors.name && touched.name && (
        <p className={style["error-message"]}>{errors.name}</p>
      )}
      <label className={style["auth-label"]} id="email">
        Last name*
      </label>
      <div className={style["input-wrapper"]}>
        <FontAwesomeIcon icon={faUser} />
        <input
          className={style["auth-input"]}
          name="last_name"
          type="text"
          value={values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your last name"
        />
      </div>
      {errors["last_name"] && touched["last_name"] && (
        <p className={style["error-message"]}>{errors["last_name"]}</p>
      )}
      <label className={style["auth-label"]}>Phone number*</label>
      <div className={style["input-wrapper"]}>
        <FontAwesomeIcon icon={faPhone} />
        <input
          className={style["auth-input"]}
          name="phone_number"
          type="text"
          value={values.phone_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your phone number"
        />
      </div>
      {errors.phone_number && touched.phone_number && (
        <p className={style["error-message"]}>{errors["phone_number"]}</p>
      )}
      <label className={style["auth-label"]} id="email">
        Email*
      </label>
      <div className={style["input-wrapper"]}>
        <FontAwesomeIcon icon={faEnvelope} />
        <input
          className={style["auth-input"]}
          name="email"
          type="email"
          value={values.email}
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
      <label className={style["auth-label"]} id="email">
        Adress*
      </label>
      <div className={style["input-wrapper"]}>
        <FontAwesomeIcon icon={faEnvelope} />
        <input
          className={style["auth-input"]}
          name="adress"
          type="text"
          value={values.adress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your email adress"
        />
      </div>
      <div className={style["input-wrapper"]}>
        <button
          type="submit"
          className={style["submit-btn"]}
          disabled={isSubmitting || !isValid || !wasAltereted}
        >
          Save user information
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
