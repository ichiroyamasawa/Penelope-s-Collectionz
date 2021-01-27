import React, { Component } from "react";
import "./styles.css";
import BtnCoral from "../Forms/ButtonCoral";
import { signInWithGoogle } from "./../../Firebase/utils";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form } from "react-bootstrap";

class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
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
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                      Email address
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword" className="mt-4">
                    <Form.Label>
                      <i className="fa fa-lock" aria-hidden="true"></i> Password
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      placeholder="Password"
                    />
                    <p className="forgotPwd">
                      <a className="forgotPwd" href="#">
                        Forgot Password?
                      </a>
                    </p>
                  </Form.Group>
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
