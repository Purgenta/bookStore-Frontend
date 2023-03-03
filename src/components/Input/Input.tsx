import { useState, useRef } from "react";
import style from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
interface Label extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  description: string;
}
interface Tooltip {
  description: string;
  className?: string;
}
interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onInputChange: (newValue: string) => unknown;
}
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  input: Input;
  tooltip?: Tooltip;
  labelProps?: Label;
}
const Input = ({
  input: { onInputChange, id, type, className },
  labelProps,
  tooltip,
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex-container">
      {labelProps && (
        <label className={labelProps.className} htmlFor={id}></label>
      )}
      <input
        ref={inputRef}
        onChange={() => onInputChange(inputRef.current?.value as string)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        id={id}
        type={type}
        className={className}
      />
      {tooltip && (
        <p className={`${tooltip.className} ${style["active"]}`}>
          {focused && (
            <>
              <FontAwesomeIcon icon={faCircleExclamation} />
              {tooltip.description}
            </>
          )}
        </p>
      )}
    </div>
  );
};

export default Input;
