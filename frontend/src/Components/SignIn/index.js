import React, { useState, useEffect } from "react";
import "./styles.css";
import BtnCoral from "../Forms/ButtonCoral";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form } from "react-bootstrap";

import FormInput from "./../Forms/FormInput";
import AuthWrapper from "./../AuthWrapper";

import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "./../../Redux/User/user.actions";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
});

const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const configAuthWrapper = {
    headline: "Welcome",
    icon: <i class="fa fa-heart" aria-hidden="true"></i>,
  };

  return (
    <Container fluid className="signin">
      <div className="wrap">
        <Row>
          <Col md={{ span: 4, offset: 7 }} sm={{ span: 12, offset: 12 }}>
            <AuthWrapper {...configAuthWrapper}>
              <Form className="formWrap" onSubmit={handleSubmit}>
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  size="lg"
                  handleChange={(e) => setEmail(e.target.value)}
                />

                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  size="lg"
                  handleChange={(e) => setPassword(e.target.value)}
                />
                <Link to="/recovery" className="forgotPwd">
                  Forgot Password?
                </Link>
                <Row className="buttons">
                  <Col>
                    <BtnCoral onClick={handleGoogleSignIn}>
                      <i className="fa fa-google" aria-hidden="true"></i> Google
                      Sign In
                    </BtnCoral>
                  </Col>
                  <Col>
                    <BtnCoral>LOGIN</BtnCoral>
                  </Col>
                </Row>
              </Form>
            </AuthWrapper>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default withRouter(SignIn);
