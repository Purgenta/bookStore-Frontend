import React, { useEffect } from "react";
import style from "./MultiSelect.module.css";
import { useState } from "react";
type Options = {
  value: string | number;
  label: string;
  isChecked: boolean;
};
interface MultiSelectProps {
  options: Options[];
  changeHandler: (selectedOptions: string[]) => unknown;
}
function MultiSelect({ options, changeHandler }: MultiSelectProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set<string>(options.map((option) => "" + option.value))
  );
  useEffect(() => {
    changeHandler([...selected]);
  }, [selected]);
  return (
    <>
      {options.map((option, index) => (
        <div key={index} className={style["input-group"]}>
          <input
            onChange={(event) => {
              setSelected((prev) => {
                if (prev.has(event.target.value)) {
                  prev.delete(event.target.value);
                } else prev.add(event.target.value);
                return new Set<string>([...prev]);
              });
            }}
            checked={selected.has(option.value + "")}
            type="checkbox"
            value={option.value}
          />
          <label>{option.label}</label>
        </div>
      ))}
    </>
  );
}

export default MultiSelect;
