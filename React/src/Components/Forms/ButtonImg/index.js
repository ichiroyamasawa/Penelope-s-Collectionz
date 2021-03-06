import React from "react";
import "./styles.css";

const ButtonImg = ({
  btnColor,
  id,
  name,
  handleChange,
  img,
  ...otherProps
}) => {
  return (
    <div className="buttonImg">
      <input
        type="radio"
        name={name}
        id={id}
        class="input-hidden"
        onChange={handleChange}
      />
      <label for={id}>
        <img src={img} alt={name} className="radioImg" />
      </label>
    </div>
  );
};

export default ButtonImg;
