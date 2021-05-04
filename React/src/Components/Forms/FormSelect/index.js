import React from "react";
import "./styles.css";

const FormSelect = ({
  options,
  defaultValue,
  handleChange,
  optgroup,
  label,
  ...otherProps
}) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className="formRow">
      {label && <label>{label}</label>}

      <select value={defaultValue} onChange={handleChange} {...otherProps}>
        {optgroup && (
          <optgroup label={optgroup}>
            {options.map((option, index) => {
              const { value, name } = option;

              return (
                <option key={index} value={value}>
                  {name}
                </option>
              );
            })}
          </optgroup>
        )}
        {options.map((option, index) => {
          const { value, name } = option;

          return (
            <option key={index} value={value}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
