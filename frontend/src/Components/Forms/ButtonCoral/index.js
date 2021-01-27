import React from "react";
import "./styles.css";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

const BtnCoral = ({ children, ...otherProps }) => {
  return (
    <Button
      className="btn-coral btn-lg"
      type="submit"
      size="lg"
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default BtnCoral;
