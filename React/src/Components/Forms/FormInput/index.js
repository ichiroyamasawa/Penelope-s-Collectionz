import React from "react";
import "./styles.css";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form } from "react-bootstrap";

const FormInput = ({ handleChange, label, subText, ...otherProps }) => {
  return (
    <div className="formRow">
      <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
          required
          size="lg"
          className="formInput"
          onChange={handleChange}
          {...otherProps}
          
        />
        {subText && <Form.Text className="text-muted">{subText}</Form.Text>}
      </Form.Group>
    </div>
  );
};

export default FormInput;
