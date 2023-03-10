import { FormValues } from "./RegisterForm";
const namesRegex = new RegExp("^[A-Z]{1}[a-z]{1,30}$");
const validate = (values: FormValues) => {
  const errors: FormValues = {
    email: "",
    password: "",
    name: "",
    lastName: "",
  };
  if (!namesRegex.test(values.name)) {
    errors.name = "Please enter a valid name";
  }
  if (!namesRegex.test(values.lastName)) {
    errors.lastName = "Please enter a valid last name";
  }
  if (!values.email) {
    errors.email = "Please enter a valid email";
  }
  const password = values.password.trim();
  if (password.length < 5 || password.length > 16) {
    errors.password = "Password lenght must be between 5 and 16 characters";
  }
  if (!errors.email && !errors.password && !errors.name && !errors.lastName) {
    return undefined;
  }
  return errors;
};
export default validate;
