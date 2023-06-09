import { FormValues } from "./RegisterForm";
const namesRegex = new RegExp("^[A-Z]{1}[a-z]{1,30}$");
const phoneRegex = new RegExp("^[0-9]{8,20}$");
const validate = (values: FormValues) => {
  const errors: FormValues = {
    email: "",
    password: "",
    name: "",
    last_name: "",
    phone_number: "",
    adress: "",
  };
  if (!namesRegex.test(values.name)) {
    errors.name = "Please enter a valid name";
  }
  if (!namesRegex.test(values.last_name)) {
    errors.last_name = "Please enter a valid last name";
  }
  if (!values.email) {
    errors.email = "Please enter a valid email";
  }
  if (!phoneRegex.test(values.phone_number)) {
    errors.phone_number = "Please enter a valid phone number";
  }
  const password = values.password.trim();
  if (password.length < 5 || password.length > 16) {
    errors.password = "Password lenght must be between 5 and 16 characters";
  }
  const adress = values.adress.trim();
  if (adress.length < 10 || adress.length > 30) {
    errors.adress = "Adress length must be between 10 and 30";
  }
  if (
    !errors.email &&
    !errors.password &&
    !errors.name &&
    !errors.last_name &&
    !errors.adress
  ) {
    return undefined;
  }
  return errors;
};
export default validate;
