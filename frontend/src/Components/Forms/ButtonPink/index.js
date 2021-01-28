import React from "react";
import "./styles.css";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

const BtnPink = ({ children, ...otherProps }) => {
  return (
    <Button className="btn-pink btn-lg shadow-none" size="lg" {...otherProps}>
      {children}
    </Button>
  );
};

export default BtnPink;
