import React, { useEffect } from "react";
import style from "./MultiSelect.module.css";
import { useState } from "react";
interface MultiSelectProps {
  options: string[];
  changeHandler: (selectedOptions: string[]) => unknown;
}
function MultiSelect({ options, changeHandler }: MultiSelectProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set<string>());
  useEffect(() => {
    changeHandler([...selected]);
  }, [selected]);
  return (
    <>
      {options.map((option, index) => (
        <div key={index} className={style["input-group"]}>
          <input
            onChange={(event) => {
              console.log(event.target.value);
              setSelected((prev) => {
                if (prev.has(event.target.value)) {
                  prev.delete(event.target.value);
                } else prev.add(event.target.value);
                return new Set<string>([...prev]);
              });
            }}
            type="checkbox"
            value={option}
          />
          <label>{option}</label>
        </div>
      ))}
    </>
  );
}

export default MultiSelect;
