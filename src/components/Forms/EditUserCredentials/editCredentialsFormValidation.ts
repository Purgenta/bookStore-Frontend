import { EditUserCredentials } from "./EditCredentialsForm";
import { passwordValidation } from "../../../validation/validation";
const validate = (values: EditUserCredentials) => {
  const errors: EditUserCredentials = {
    confirmNewPassword: "",
    newPassword: "",
    currentPassword: "",
  };
  errors.confirmNewPassword = passwordValidation(values.confirmNewPassword);
  errors.currentPassword = passwordValidation(values.currentPassword);
  errors.newPassword = passwordValidation(values.currentPassword);
  if (
    !errors.confirmNewPassword &&
    values.confirmNewPassword === values.newPassword &&
    !errors.currentPassword
  )
    return undefined;
  return errors;
};
export default validate;
