import React, { Component } from "react";
import "./styles.css";
import BtnCoral from "../Forms/ButtonCoral";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";

import BtnPink from "../Forms/ButtonPink";
import FormInput from "./../Forms/FormInput";
import AuthWrapper from "./../AuthWrapper";
import AlertError from "./../AlertError";

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
      const err = ["Passwords don't match."];
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

    const configAuthWrapper = {
      headline: "Getting Started",
    };

    return (
      <Container fluid className="signup">
        <div className="wrap">
          <Row>
            <Col>
              <AuthWrapper {...configAuthWrapper}>
                {errors.length > 0 && (
                  <ul>
                    {errors.map((e, index) => {
                      return <AlertError keyIndex={index} error={e} />;
                    })}
                  </ul>
                )}

                <Form onSubmit={this.handleFormSubmit}>
                  <Form.Row>
                    <Col md={6} sm={12}>
                      <FormInput
                        label={[
                          <i class="fa fa-user" aria-hidden="true"></i>,
                          " First Name",
                        ]}
                        type="text"
                        placeholder="Enter first name"
                        name="fName"
                        value={fName}
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col md={6} sm={12}>
                      <FormInput
                        label="Last Name"
                        type="text"
                        placeholder="Enter last name"
                        name="lName"
                        value={lName}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Form.Row>

                  <FormInput
                    label={[
                      <i class="fa fa-phone" aria-hidden="true"></i>,
                      " Contact Number",
                    ]}
                    type="tel"
                    placeholder="Enter your current Contact Number"
                    subText="Format: 09XXXXXXXXX"
                    name="contactNo"
                    value={contactNo}
                    pattern="[0-9]{11}"
                    onChange={this.handleChange}
                  />
                  <FormInput
                    label={[
                      <i class="fa fa-envelope" aria-hidden="true"></i>,
                      " Email",
                    ]}
                    type="email"
                    placeholder="example@email.com"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />

                  <Form.Row>
                    <Col md={6} sm={12}>
                      <FormInput
                        label={[
                          <i class="fa fa-lock" aria-hidden="true"></i>,
                          " Password",
                        ]}
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </Col>

                    <Col md={6} sm={12}>
                      <FormInput
                        label="Confirm Password"
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
              </AuthWrapper>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export default Signup;
