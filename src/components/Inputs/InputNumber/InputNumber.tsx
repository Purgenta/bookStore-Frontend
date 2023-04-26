import React, { InputHTMLAttributes, useEffect } from "react";
import style from "./InputNumber.module.css";
import { useState } from "react";
interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  getChange: (input: number) => unknown;
}
const InputNumber = ({ min, max, getChange }: InputNumberProps) => {
  const [value, setValue] = useState<number>(min as number);
  useEffect(() => {
    getChange(value);
  }, [value]);
  return (
    <div className={style["input-wrapper"]}>
      <button
        onClick={() =>
          setValue((value) => {
            if ((value - 1 >= min) as number) return value - 1;
            else return value;
          })
        }
        className={style["action"]}
      >
        -
      </button>
      <input type="number" min={min} max={max}></input>
      <button className={style["action"]}>-</button>
    </div>
  );
};

export default InputNumber;
