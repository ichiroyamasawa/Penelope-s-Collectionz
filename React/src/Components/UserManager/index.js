import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Table, Col, Row, Form } from "react-bootstrap";
import BtnSec from "../../Components/Forms/ButtonSecondary";

import { deleteUserStart } from "./../../Redux/User/user.actions";

const UserManager = ({
  UserUID,
  firstName,
  lastName,
  contactNum,
  email,
  userRoles,
  handleClick,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [click, setClick] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <Button variant="danger" onClick={() => handleShow()} size="lg">
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deleting a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Deleting User <strong>{UserUID}</strong> with an email{" "}
            <strong>{email}</strong>
          </p>
          <br />
          For security reasons, you will be redirected to Firebase where you
          have to sign in as an admin. Kindly delete the user above to complete
          the user deletion.
        </Modal.Body>

        {click ? (
          <BtnSec
            variant="secondary"
            onClick={() => {
              handleClose();
              setClick(false);
              dispatch(deleteUserStart(UserUID));
            }}
          >
            Close
          </BtnSec>
        ) : (
          <a
            target="_blank"
            href="https://console.firebase.google.com/u/1/project/penelope-s-collectionz/authentication/users"
          >
            <BtnSec
              variant="secondary"
              onClick={() => {
                setClick(true);
              }}
            >
              Understood
            </BtnSec>
          </a>
        )}
      </Modal>
    </div>
  );
};

export default UserManager;
