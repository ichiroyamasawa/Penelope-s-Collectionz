import React from "react";
import "./styles.css";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

const BtnSideNav = ({ children, ...otherProps }) => {
  return (
    <Button className="btn-side btn-lg shadow-none" size="lg" {...otherProps}>
      {children}
    </Button>
  );
};

export default BtnSideNav;
