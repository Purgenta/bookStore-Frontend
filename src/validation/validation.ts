const namesRegex = new RegExp("^[A-Z]{1}[a-z]{1,30}$");
const phoneRegex = new RegExp("^[0-9]{8,20}$");
const passwordValidation = (password: string) => {
  return password.length < 5 && password.length > 16
    ? ""
    : "Your password length must be between 5 and 16";
};
const nameValidation = (name: string) => {
  return !namesRegex.test(name) ? "Please enter a valid name" : "";
};
const phoneValidation = (phone_number: string) => {
  return !phoneRegex.test(phone_number)
    ? "Please enter a valid mobile phone"
    : "";
};
export { phoneValidation, nameValidation, passwordValidation };
