import React, { InputHTMLAttributes, useEffect } from "react";
import style from "./InputNumber.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
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
        aria-label="decrement button"
        onClick={() =>
          setValue((value) => {
            if (value - 1 >= min) return value - 1;
            return value;
          })
        }
        className={style["action"]}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <input
        className={style["number-input"]}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const newValue = +event.target.value;
          if (newValue < min) setValue(min);
          else if (newValue > max) setValue(max);
        }}
      ></input>
      <button
        aria-label="increment button"
        onClick={() =>
          setValue((value) => {
            if (value + 1 <= max) return value + 1;
            return value;
          })
        }
        className={style["action"]}
      >
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default InputNumber;
