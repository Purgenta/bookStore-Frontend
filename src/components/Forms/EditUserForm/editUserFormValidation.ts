import { FormValues } from "./EditUserForm";
import {
  nameValidation,
  phoneValidation,
  emailValidation,
} from "../../../validation/validation";
const validate = (values: FormValues) => {
  const errors: FormValues = {
    email: "",
    name: "",
    last_name: "",
    phone_number: "",
  };
  errors.last_name = nameValidation(values.last_name);
  errors.email = emailValidation(values.email);
  errors.name = nameValidation(values.name);
  errors.phone_number = phoneValidation(values.phone_number);
  let property: keyof typeof errors;
  for (property in errors) {
    if (errors[property] !== "") return errors;
  }
  return undefined;
};
export default validate;
