import React, { Component } from "react";
import "./styles.css";

import FormInput from "./../Forms/FormInput";
import ButtonCoral from "./../Forms/ButtonCoral";
import AuthWrapper from "./../AuthWrapper";
import AlertError from "./../AlertError";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";

import { auth } from "./../../Firebase/utils";
import { withRouter } from "react-router-dom";

const initialState = {
  email: "",
  errors: [],
};

class PasswordRecovery extends Component {
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

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;

      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found. Please try again."];
          this.setState({
            errors: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email, errors } = this.state;

    const configAuthWrapper = {
      headline: "Password Recovery",
    };
    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((e, index) => {
                return <AlertError keyIndex={index} error={e} />;
              })}
            </ul>
          )}
          <Form onSubmit={this.handleSubmit}>
            <FormInput
              label={[
                <i class="fa fa-envelope" aria-hidden="true"></i>,
                " Email",
              ]}
              type="email"
              name="email"
              value={email}
              placeholder="example@email.com"
              subText="We will send an email to the Email Address above to recover your password"
              onChange={this.handleChange}
            />
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <ButtonCoral>Submit</ButtonCoral>
              </Col>
            </Row>
          </Form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(PasswordRecovery);
