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
  errors.newPassword = passwordValidation(values.newPassword);
  if (values.currentPassword === values.newPassword)
    errors.newPassword = "New password can't be same as the old";
  if (values.confirmNewPassword !== values.newPassword)
    errors.confirmNewPassword = "Password's don't match";
  let key: keyof typeof errors;
  for (key in errors) {
    if (errors[key] !== "") return errors;
  }
  return undefined;
};
export default validate;
