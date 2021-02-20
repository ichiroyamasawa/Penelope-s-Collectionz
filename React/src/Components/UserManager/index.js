import React from "react";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table, Col, Row, Form } from "react-bootstrap";

const UserManager = ({
  UserUID,
  firstName,
  lastName,
  contactNum,
  email,
  userRoles,
  handleClick,
}) => {
  return (
    <div className="userManagerWrapper">
      <Row>
        <Col className="userManagerWrapperDataUID">
          <i class="fa fa-id-badge" aria-hidden="true"></i> UID: {UserUID}
        </Col>
      </Row>
      <Row>
        <Col className="userManagerWrapperData">
          <i class="fa fa-user" aria-hidden="true"></i> Last Name:{" "}
          <span className="userDetails">{lastName}</span>
        </Col>
        <Col className="userManagerWrapperData">
          First Name: <span className="userDetails">{firstName}</span>
        </Col>
      </Row>
      <Row>
        <Col className="userManagerWrapperData">
          <i class="fa fa-phone" aria-hidden="true"></i> Contact Number:{" "}
          <span className="userDetails">{contactNum}</span>
        </Col>
        <Col className="userManagerWrapperData">
          <i class="fa fa-envelope" aria-hidden="true"></i> Email:{" "}
          <span className="userDetails">{email}</span>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="text-right mt-3">
          <Button variant="danger" onClick={handleClick} size="lg">
            <i class="fa fa-trash" aria-hidden="true"></i> Delete User
          </Button>
        </Col>
      </Row>
      {/* {userRoles &&
        userRoles.map((index) => {
          <Row>
            <Col>{index}</Col>
          </Row>;
        })} */}
    </div>
  );
};

export default UserManager;
