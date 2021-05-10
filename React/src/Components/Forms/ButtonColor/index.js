import React from "react";
import "./styles.css";

const ButtonColor = ({ btnColor, id, name, handleChange, ...otherProps }) => {
  return (
    <div className="buttonColor">
      <input
        type="radio"
        name={name}
        id={id}
        class="input-hidden"
        onChange={handleChange}
        {...otherProps}
      />
      <label for={id}>
        <div style={{ backgroundColor: btnColor }} className="colorDisp"></div>
      </label>
    </div>
  );
};

export default ButtonColor;
