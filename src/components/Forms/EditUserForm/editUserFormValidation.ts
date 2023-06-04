import { EditUserFormValuesProps } from "./EditUserForm";
const namesRegex = new RegExp("^[A-Z]{1}[a-z]{1,30}$");
const phoneRegex = new RegExp("^[0-9]{8,20}$");
const validate = (values: EditUserFormValuesProps) => {
  const errors: EditUserFormValuesProps = {
    email: "",
    name: "",
    last_name: "",
    phone_number: "",
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
  if (!errors.email && !errors.name && !errors.last_name) {
    return undefined;
  }
  return errors;
};
export default validate;
