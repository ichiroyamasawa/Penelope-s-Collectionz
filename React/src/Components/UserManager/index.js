import React from "react";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table, Col, Row, Form } from "react-bootstrap";

const UserManager = ({ UserUID, firstName, lastName, contactNum, email }) => {
  return (
    <div className="userManagerWrapper">
      <Row>
        <Col className="userManagerWrapperDataUID">
          <i class="fa fa-id-badge" aria-hidden="true"></i> UID: {UserUID}
        </Col>
      </Row>
      <Row>
        <Col className="userManagerWrapperData">
          <i class="fa fa-user" aria-hidden="true"></i> Last Name: {lastName}
        </Col>
        <Col className="userManagerWrapperData">First Name: {firstName}</Col>
      </Row>
      <Row>
        <Col className="userManagerWrapperData">
          <i class="fa fa-phone" aria-hidden="true"></i> Contact Number:{" "}
          {contactNum}
        </Col>
        <Col className="userManagerWrapperData">
          <i class="fa fa-envelope" aria-hidden="true"></i> Email: {email}
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-right mt-3">
          <Button variant="danger">
            <i class="fa fa-trash" aria-hidden="true"></i> Delete User
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default UserManager;
