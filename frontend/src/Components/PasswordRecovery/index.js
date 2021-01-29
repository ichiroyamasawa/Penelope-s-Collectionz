import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  resetAllAuthForms,
} from "./../../Redux/User/user.actions";
import "./styles.css";

import FormInput from "./../Forms/FormInput";
import ButtonCoral from "./../Forms/ButtonCoral";
import AuthWrapper from "./../AuthWrapper";
import AlertError from "./../AlertError";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";

import { withRouter } from "react-router-dom";

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

const PasswordRecovery = (props) => {
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms());
      props.history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };

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
            subText="We will send an email to the Email Address above to recover your password"
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

export default withRouter(PasswordRecovery);
