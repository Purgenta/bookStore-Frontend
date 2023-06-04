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
const EditUserCredentials = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate,
    onSubmit: () => {},
  });
  const { isValid, isSubmitting, errors } = formik;
  console.log(errors);
  return (
    <form className={style["credentials-form"]} onSubmit={formik.handleSubmit}>
      <label htmlFor="currentPassword">Current password:</label>
      <div className={style["input-group__wrapper"]}>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
        <input
          type="password"
          onChange={formik.handleChange}
          name="currentPassword"
        ></input>
      </div>
      <label htmlFor="newPassword">New password:</label>
      <div className={style["input-group__wrapper"]}>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
        <input
          type="password"
          onChange={formik.handleChange}
          name="newPassword"
        ></input>
      </div>
      <label htmlFor="confirmNewPassword">Confirm new password:</label>
      <div className={style["input-group__wrapper"]}>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
        <input
          type="password"
          onChange={formik.handleChange}
          name="confirmNewPassword"
        ></input>
      </div>
      <div className={style["input-group-wrapper"]}>
        <button disabled={!isValid || isSubmitting}>Change password</button>
      </div>
    </form>
  );
};

export default EditUserCredentials;
