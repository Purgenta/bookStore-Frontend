import { FormValues } from "./RegisterForm";
const validate = (values: FormValues) => {
  const errors: FormValues = {
    email: "",
    password: "",
  };
  if (!values.email) {
    errors.email = "Please enter a valid email";
  }
  const password = values.password.trim();
  if (password.length < 5 || password.length > 16) {
    errors.password = "Password lenght must be between 5 and 16 characters";
  }
  return errors;
};
export default validate;
