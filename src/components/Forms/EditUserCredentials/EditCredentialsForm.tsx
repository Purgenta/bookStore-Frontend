import { useFormik } from "formik";
import style from "./EditCredentialsForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import validate from "./editCredentialsFormValidation";
export type EditUserCredentials = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
import useUpdateCredentials from "../../../hooks/requests/user/useUpdateCredentials";
const EditUserCredentials = () => {
  const { responseError, updateCredentials } = useUpdateCredentials();
  const formik = useFormik<EditUserCredentials>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate,
    validateOnMount: true,
    onSubmit: async (values) => {
      await updateCredentials(values);
    },
  });
  const { isValid, isSubmitting, errors, touched } = formik;
  console.log(errors.currentPassword);
  return (
    <form className={style["credentials-form"]} onSubmit={formik.handleSubmit}>
      <h3>{responseError}</h3>
      <label htmlFor="currentPassword">Current password:</label>
      <div className={style["input-group__wrapper"]}>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
        <input
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="currentPassword"
        ></input>
      </div>
      {errors.currentPassword && touched.currentPassword && (
        <p className={style["error-message"]}>{errors.currentPassword}</p>
      )}
      <label htmlFor="newPassword">New password:</label>
      <div className={style["input-group__wrapper"]}>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
        <input
          type="password"
          onChange={formik.handleChange}
          name="newPassword"
          onBlur={formik.handleBlur}
        ></input>
      </div>
      {errors.newPassword && touched.newPassword && (
        <p className={style["error-message"]}>{errors.newPassword}</p>
      )}
      <label htmlFor="confirmNewPassword">Confirm new password:</label>
      <div className={style["input-group__wrapper"]}>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
        <input
          type="password"
          onChange={formik.handleChange}
          name="confirmNewPassword"
          onBlur={formik.handleBlur}
        ></input>
      </div>
      {errors.confirmNewPassword && touched.confirmNewPassword && (
        <p className={style["error-message"]}>{errors.confirmNewPassword}</p>
      )}
      <div className={style["input-group-wrapper"]}>
        <button type="submit" disabled={!isValid || isSubmitting}>
          Change password
        </button>
      </div>
    </form>
  );
};

export default EditUserCredentials;
