import React, { Component } from "react";
import "./styles.css";
import BtnCoral from "../Forms/ButtonCoral";
import { signInWithGoogle, auth } from "./../../Firebase/utils";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form } from "react-bootstrap";

import FormInput from "./../Forms/FormInput";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
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
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <Container fluid className="signin">
        <div className="wrap">
          <Row>
            <Col md={{ span: 4, offset: 7 }} sm={{ span: 12, offset: 12 }}>
              <div className="rect-login">
                <h1 className="userLogin">
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </h1>
                <h2 className="userLogin">Welcome!</h2>
                <Form className="formWrap" onSubmit={this.handleSubmit}>
                  <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter email"
                    size="lg"
                    handleChange={this.handleChange}
                  />

                  <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    size="lg"
                    handleChange={this.handleChange}
                  />
                  <p className="forgotPwd">
                    <a className="forgotPwd" href="#">
                      Forgot Password?
                    </a>
                  </p>
                  <Row className="buttons">
                    <Col>
                      <BtnCoral>LOGIN</BtnCoral>
                    </Col>
                    <Col>
                      <BtnCoral onClick={signInWithGoogle}>
                        <i className="fa fa-google" aria-hidden="true"></i>{" "}
                        Google Sign In
                      </BtnCoral>
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

export default SignIn;
