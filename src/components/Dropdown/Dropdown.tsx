import React from "react";
import style from "./Dropdown.module.css";
import { useState } from "react";
type DropdownProps = {
  label: string;
  children?: JSX.Element | JSX.Element[] | null;
};
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
const Dropdown = ({ children, label }: DropdownProps) => {
  const [active, setActive] = useState(true);
  return (
    <div className={style["dropdown"]}>
      <button
        type="button"
        onClick={() => setActive((prev) => !prev)}
        className={style["toggle-dropdown"]}
      >
        {label}
        <FontAwesomeIcon
          className={`${style["toggle-icon"]} ${
            active ? style["active-icon"] : style["off-icon"]
          }`}
          icon={faGreaterThan}
        ></FontAwesomeIcon>
      </button>
      <div
        className={`${style["children-wrapper"]} ${
          active
            ? style["active-children__wrapper"]
            : style["off-children__wrapper"]
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
