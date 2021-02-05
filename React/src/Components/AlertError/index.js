import React from "react";
//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";

const AlertError = ({ keyIndex, error }) => {
  return (
    <Alert className="alert" key={keyIndex} variant="danger">
      {error}
    </Alert>
  );
};

export default AlertError;
