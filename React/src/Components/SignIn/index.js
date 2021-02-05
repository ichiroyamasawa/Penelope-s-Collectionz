import React, { useState, useEffect } from "react";
import "./styles.css";
import BtnCoral from "../Forms/ButtonCoral";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Form } from "react-bootstrap";

import FormInput from "./../Forms/FormInput";
import AuthWrapper from "./../AuthWrapper";
import AlertError from "./../AlertError";
import { resetUserState } from "./../../Redux/User/user.actions";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "./../../Redux/User/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors([]);
  };

  const reset = () => {
    dispatch(resetUserState());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
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
              {errors.length > 0 && (
                <ul>
                  {errors.map((e, index) => {
                    return <AlertError keyIndex={index} error={e} />;
                  })}
                </ul>
              )}
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
                <Link to="/recovery" className="forgotPwd" onClick={reset}>
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

export default SignIn;
