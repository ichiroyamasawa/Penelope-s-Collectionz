import React, { Component } from "react";
import "./styles.css";
import BtnCoral from "../Forms/ButtonCoral";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form } from "react-bootstrap";

import BtnPink from "../Forms/ButtonPink";
import FormInput from "./../Forms/FormInput";

import { auth, handleUserProfile } from "./../../Firebase/utils";

const initialState = {
  fName: "",
  lName: "",
  contactNo: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const {
      fName,
      lName,
      contactNo,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    if (password !== confirmPassword) {
      const err = ["Oops! Password Don't Match."];
      this.setState({
        errors: err,
      });
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { fName, lName, contactNo });

      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      fName,
      lName,
      contactNo,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <Container fluid className="signup">
        <div className="wrap">
          <Row>
            <Col>
              <div className="register-rect">
                <h1 class="gettingStarted">Getting Started</h1>

                {errors.length > 0 && (
                  <ul>
                    {errors.map((err, index) => {
                      return <li key={index}>{err}</li>;
                    })}
                  </ul>
                )}

                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Row>
                    <Col md={6} sm={12}>
                      <FormInput
                        type="text"
                        placeholder="Enter first name"
                        name="fName"
                        value={fName}
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col md={6} sm={12}>
                      <FormInput
                        type="text"
                        placeholder="Enter last name"
                        name="lName"
                        value={lName}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Form.Row>

                  <FormInput
                    type="tel"
                    placeholder="XXXX-XXX-XXXX"
                    name="contactNo"
                    value={contactNo}
                    pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
                    onChange={this.handleChange}
                  />

                  <FormInput
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />

                  <Form.Row>
                    <Col md={6} sm={12}>
                      <FormInput
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col md={6} sm={12}>
                      <FormInput
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Form.Row>
                  <Row>
                    <Col>
                      <BtnPink type="reset">Reset</BtnPink>
                    </Col>
                    <Col>
                      <BtnCoral type="submit">Signup</BtnCoral>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Signup;
