import React from "react";
import "./styles.css";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

const ButtonColor = ({ color, id, name, ...otherProps }) => {
  return (
    <div className="buttonColor">
      <input type="radio" name={name} id={id} class="input-hidden" />
      <label for={id}>
        <div style={{ backgroundColor: color }} className="colorDisp"></div>
      </label>
    </div>
  );
};

export default ButtonColor;
