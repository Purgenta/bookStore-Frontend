const namesRegex = new RegExp("^[A-Z]{1}[a-z]{1,30}$");
const phoneRegex = new RegExp("^[0-9]{8,20}$");
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordValidation = (password: string) => {
  if (password.length >= 5 && password.length <= 16) return "";
  return "Your password length must be between 5 and 16";
};
const nameValidation = (name: string) => {
  return !namesRegex.test(name) ? "Please enter a valid name" : "";
};
const adressValidation = (adress: string) => {
  return adress.trim().length < 10 || adress.trim().length > 30
    ? "Please enter a valid adress (10-30 chars)"
    : "";
};
const phoneValidation = (phone_number: string) => {
  return !phoneRegex.test(phone_number)
    ? "Please enter a valid mobile phone"
    : "";
};
const emailValidation = (email: string) =>
  emailRegex.test(email) ? "" : "Please enter a valid email";
export {
  phoneValidation,
  adressValidation,
  nameValidation,
  passwordValidation,
  emailValidation,
};
