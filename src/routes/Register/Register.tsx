import style from "./Register.module.css";
import Input from "../../components/Input/Input";
import { useState } from "react";
type InputState = {
  isValid: boolean;
  currentValue: string;
};
const initialState: InputState = {
  isValid: false,
  currentValue: "",
};
const Register = () => {
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const emailChangeHandler = (value: string) => {};
  const passwordChangeHandler = (value: string) => {};
  return (
    <section className={style["register"]}>
      <div className={style["register-form__wrapper"]}>
        <form>
          <Input input={{ id: "email", onInputChange: emailChangeHandler }} />
          <Input
            input={{ id: "password", onInputChange: passwordChangeHandler }}
            labelProps={{ description: "password" }}
          />
        </form>
      </div>
    </section>
  );
};

export default Register;
