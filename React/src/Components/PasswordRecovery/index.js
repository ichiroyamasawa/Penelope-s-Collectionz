import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordStart,
  resetUserState,
} from "./../../Redux/User/user.actions";
import "./styles.css";

import FormInput from "./../Forms/FormInput";
import ButtonCoral from "./../Forms/ButtonCoral";
import AuthWrapper from "./../AuthWrapper";
import AlertError from "./../AlertError";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";

import { useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr,
});

const PasswordRecovery = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  };

  const configAuthWrapper = {
    headline: "Reset Password",
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
        <Form onSubmit={handleSubmit}>
          <FormInput
            label={[
              <i class="fa fa-envelope" aria-hidden="true"></i>,
              " Email",
            ]}
            type="email"
            name="email"
            value={email}
            placeholder="example@email.com"
            subText="We will send an email to the Email Address above to reset your password"
            handleChange={(e) => setEmail(e.target.value)}
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
};

export default PasswordRecovery;
