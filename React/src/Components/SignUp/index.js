import React, { useState, useEffect } from "react";
import "./styles.css";
import BtnCoral from "../Forms/ButtonCoral";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container, Form, Modal } from "react-bootstrap";

import BtnPink from "../Forms/ButtonPink";
import FormInput from "./../Forms/FormInput";
import AuthWrapper from "./../AuthWrapper";
import AlertError from "./../AlertError";

import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart } from "./../../Redux/User/user.actions";
import { useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const Signup = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentUser) {
      reset();
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const reset = () => {
    setFName("");
    setLName("");
    setContactNo("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (nameValid(fName) && nameValid(lName)) {
      dispatch(
        signUpUserStart({
          fName,
          lName,
          contactNo,
          email,
          password,
          confirmPassword,
        })
      );
    } else {
      setFName("");
      setLName("");
    }
  };

  const configAuthWrapper = {
    headline: "Getting Started",
  };

  const nameValid = (txt) => txt && txt.replace(/\s/g, "").length;

  return (
    <Container fluid className="signup">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hi! Your trust and security is important to us. We promise you, our
          dear Ka'Pretty, that any information you provide us will never be
          disclosed to anyone. Personal information such as your{" "}
          <strong>name</strong>, <strong>email</strong>, and{" "}
          <strong>contact number</strong> will only be used to help facilitate
          transactions and communication with you. After ordering your favorite
          product/s, you will also be asked for your <strong>address</strong>{" "}
          for a speedy delivery.
        </Modal.Body>
        <Modal.Body>
          By signing up, you agree to the collection and use of your information
          in accordance with this policy. Cheers!
        </Modal.Body>
        <Modal.Footer>
          <BtnPink onClick={handleClose}>Continue</BtnPink>
        </Modal.Footer>
      </Modal>
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

              <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                  <Col md={6} sm={12}>
                    <FormInput
                      label={[
                        <i class="fa fa-user" aria-hidden="true"></i>,
                        " First Name",
                      ]}
                      type="text"
                      placeholder="Enter first name"
                      pattern="[a-zA-Z ]*"
                      title="Names should not contain numbers and special characters."
                      name="fName"
                      value={fName}
                      handleChange={(e) => setFName(e.target.value)}
                    />
                  </Col>

                  <Col md={6} sm={12}>
                    <FormInput
                      label="Last Name"
                      type="text"
                      pattern="[a-zA-Z ]*"
                      title="Names should not contain numbers and special characters."
                      placeholder="Enter last name"
                      name="lName"
                      value={lName}
                      handleChange={(e) => setLName(e.target.value)}
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
                  handleChange={(e) => setContactNo(e.target.value)}
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
                  handleChange={(e) => setEmail(e.target.value)}
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
                      subText="Password must be at least 6 characters"
                      name="password"
                      pattern=".{6,}"
                      title="Must be at least 6 characters"
                      value={password}
                      handleChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>

                  <Col md={6} sm={12}>
                    <FormInput
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      pattern=".{6,}"
                      title="Must be at least 6 characters"
                      value={confirmPassword}
                      handleChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Col>
                </Form.Row>
                <Row className="mt-3">
                  <Col>
                    <BtnPink type="reset" onClick={reset}>
                      Reset
                    </BtnPink>
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
};

export default Signup;
