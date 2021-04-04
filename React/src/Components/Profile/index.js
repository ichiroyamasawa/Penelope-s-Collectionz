import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Modal,
  Tab,
  Nav,
} from "react-bootstrap";

import AlertError from "./../AlertError";

// Media Imports
import ImagePlaceholder from "./../../Assets/woman-2.png";

import { storage } from "./../../Firebase/utils";
import Cropper from "react-easy-crop";
import FormInput from "./../Forms/FormInput";

import {
  editUserStart,
  signOutUserStart,
  changeUserEmail,
  changeUserPassword,
  changeUserContact,
} from "./../../Redux/User/user.actions";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  userErr: state.user.userErr,
});

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, userErr } = useSelector(mapState);
  const [user, setUser] = useState([]);
  const [Item, setItem] = useState(user);
  const [userImage, setUserImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConPassword, setNewConPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [newContactNo, setNewContactNo] = useState("");
  const [errors, setErrors] = useState([]);

  // Modals
  const [warningShow, setWarningShow] = useState(false);

  const handleWarningClose = () => setWarningShow(false);
  const handleWarningShow = () => setWarningShow(true);
  const [newContactShow, setNewContactShow] = useState(false);
  const handleNewContactClose = () => {
    setNewContactShow(false);
    clearForm();
  };
  const handleNewContactShow = () => setNewContactShow(true);
  const [emailPassShow, setEmailPassShow] = useState(false);
  const handleEmailPassClose = () => setEmailPassShow(false);
  const handleEmailPassShow = () => setEmailPassShow(true);
  const [newEmailShow, setNewEmailShow] = useState(false);
  const handleNewEmailClose = () => {
    setNewEmailShow(false);
    clearForm();
  };
  const handleNewEmailShow = () => setNewEmailShow(true);
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const handleNewPasswordClose = () => {
    setNewPasswordShow(false);
    clearForm();
  };
  const handleNewPasswordShow = () => setNewPasswordShow(true);

  const clearForm = () => {
    setCurrentPassword("");
    setNewEmail("");
    setNewPassword("");
    setNewConPassword("");
    setErrors([]);
    setContactNo("");
    setNewContactNo("");
  };

  const editItem = (item) => {
    setUser({
      fName: item.fName,
      lName: item.lName,
      contactNo: item.contactNo,
      userID: currentUser.id,
      userImage: userImage,
    });
  };

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  useEffect(() => {
    editItem(currentUser);
    if (currentUser.userImage !== "") {
      setUserImage(currentUser.userImage);
    }
    //Added console.log to show what the current item is and that it has passed
    console.log("useEffect passes the current code: ", user);
  }, []);

  useEffect(() => {
    setItem(user);

    //Added console.log to show what the current item is and that it has passed
    console.log("useEffect passes the current code: ", user);
  }, [user]);

  const onEdit = (e) => {
    const { name, value } = e.target;
    setItem({ ...Item, [name]: value });
  };

  const handleProductImage = (e) => {
    const imgFile = e.target.files[0];
    const fileStorage = storage.ref(`userImages/${imgFile.name}`).put(imgFile);

    fileStorage.then(() => {
      console.log("File uploaded successfully");
      storage
        .ref("userImages")
        .child(imgFile.name)
        .getDownloadURL()
        .then((url) => {
          setUserImage(url);
          console.log(url);
        });
    });
  };

  // For Image Crop\
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameValid(Item.fName) && nameValid(Item.lName)) {
      dispatch(editUserStart(Item));
      window.location.reload();
    } else {
      setItem({ ...Item, fName: currentUser.fName });
      setItem({ ...Item, lName: currentUser.lName });
    }
  };

  const onContactChange = (e) => {
    e.preventDefault();
    if (contactNo === currentUser.contactNo) {
      const changes = {
        contactNo: newContactNo,
        currentPassword: currentPassword,
      };
      dispatch(changeUserContact({ changes }));
    } else {
      setErrors(["You typed the wrong current phone number."]);
    }
  };

  const onEmailChange = (e) => {
    e.preventDefault();
    const changes = {
      email: newEmail,
      currentPassword: currentPassword,
    };
    dispatch(changeUserEmail({ changes }));
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    const changes = {
      newPassword: newPassword,
      newConPassword: newConPassword,
      currentPassword: currentPassword,
    };
    dispatch(changeUserPassword({ changes }));
  };

  const nameValid = (txt) => txt && txt.replace(/\s/g, "").length;

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="profile-sectionTitle">My profile</h1>
        </Col>
      </Row>
      <br />
      <Row>
        <Col
          md={{ span: 10, offset: 1 }}
          className="profileWrapper justify-items-center"
        >
          <Form onSubmit={handleSubmit}>
            <div className="imgUpload">
              <Row className="justify-content-center">
                <Col md="auto">
                  <h2 className="text-center profile-subTitle">
                    Edit Information
                  </h2>
                  <label htmlFor="uploadImg">
                    {/* {userImage && (
                    <div>
                      <Cropper
                        image={userImage}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        // onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                      />
                    </div>
                  )} */}
                    <img
                      className="userImgPlaceholder"
                      src={userImage || Item.userImage || ImagePlaceholder}
                      alt={currentUser.id}
                    />
                    <div className="imgChanger">
                      {userImage && (Item.userImage = userImage)}
                    </div>
                  </label>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="auto" xs="auto">
                  {/* {!userImage ? ( */}
                  <input
                    type="file"
                    id="uploadImg"
                    name="userImage"
                    label={[]}
                    size="lg"
                    className="profileImageInput"
                    placeholder="User Image URL"
                    accept="image/*"
                    onChange={handleProductImage}
                  />
                  {/* ) 
                : (
                    <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        ></Button>
                )
                } */}
                </Col>
              </Row>
            </div>
            <Container>
              {/* <Form.Group as={Row} controlId="email">
                <Form.Label column sm="3" className="text-right">
                  Email Address:
                </Form.Label>
                <Col sm="8">
                  <FormInput
                    type="email"
                    // pattern="[a-zA-Z]*"
                    // title="Names should not contain numbers and special characters."
                    name="email"
                    value={Item.email}
                    placeholder="Email Address"
                    handleChange={onEdit}
                  />
                </Col>
              </Form.Group> */}
              <Form.Group as={Row} controlId="fName">
                <Form.Label column sm="3" className="profileInputLabel">
                  First Name:
                </Form.Label>
                <Col sm="8">
                  <FormInput
                    type="text"
                    pattern="[a-zA-Z ]*"
                    title="Names should not contain numbers and special characters."
                    name="fName"
                    value={Item.fName}
                    placeholder="First Name"
                    handleChange={onEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="lName">
                <Form.Label column sm="3" className="profileInputLabel">
                  Last Name:
                </Form.Label>
                <Col sm="8">
                  <FormInput
                    type="text"
                    name="lName"
                    pattern="[a-zA-Z ]*"
                    title="Names should not contain numbers and special characters."
                    value={Item.lName}
                    placeholder="Last Name"
                    handleChange={onEdit}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="contactNo">
                <Form.Label column sm="3" className="profileInputLabel">
                  Contact Number:
                </Form.Label>
                <Col sm="6">
                  <FormInput
                    type="tel"
                    name="contactNo"
                    readOnly
                    value={
                      Item.contactNo !== undefined &&
                      Item.contactNo.replace(/\d(?=\d{4})/g, "*")
                    }
                    pattern="[0-9]{11}"
                    placeholder="Contact Number"
                    handleChange={onEdit}
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    block
                    className="profileSave editContactNum"
                    onClick={() => handleNewContactShow()}
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i> Edit
                  </Button>
                </Col>
              </Form.Group>
              <Row className="justify-content-center">
                <Col md="auto" xs="auto">
                  <Button
                    className="editEmailPass shadow-none mb-3"
                    onClick={handleEmailPassShow}
                  >
                    Change Email & Password
                  </Button>
                </Col>
              </Row>

              <Row className="justify-content-center">
                <Col md={4}>
                  <Button
                    block
                    type="submit"
                    size="lg"
                    className="profileSave shadow-none"
                  >
                    Save Changes
                  </Button>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="text-center mb-5" md={6}>
                  <em className="profileSaveNote">
                    NOTE: The page will reload after you successfully updated
                    your profile.
                  </em>
                </Col>
              </Row>
            </Container>
          </Form>
          <Modal show={newContactShow} onHide={handleNewContactClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change User Contact Number</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col className="errorHolder">
                  {errors.length > 0 && (
                    <ul>
                      {errors.map((e, index) => {
                        return <AlertError keyIndex={index} error={e} />;
                      })}
                    </ul>
                  )}
                </Col>
              </Row>

              <Form onSubmit={onContactChange}>
                <FormInput
                  label="Please enter your current password."
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  pattern=".{6,}"
                  title="Must be at least 6 characters"
                  placeholder="Current Password"
                  handleChange={(e) => setCurrentPassword(e.target.value)}
                />
                <FormInput
                  label="Enter your CURRENT phone number."
                  type="tel"
                  name="contactNo"
                  value={contactNo}
                  subText={
                    Item.contactNo !== undefined &&
                    "Hint: " + Item.contactNo.replace(/\d(?=\d{4})/g, "*")
                  }
                  pattern="[0-9]{11}"
                  placeholder="Current Phone Number"
                  handleChange={(e) => setContactNo(e.target.value)}
                />
                <FormInput
                  label="Enter your NEW phone number."
                  type="tel"
                  name="newContactNo"
                  value={newContactNo}
                  subText="Format: 09XXXXXXXXX"
                  pattern="[0-9]{11}"
                  placeholder="New Phone Number"
                  handleChange={(e) => setNewContactNo(e.target.value)}
                />
                <Row className="justify-content-center m-3">
                  <Col className="text-center" md={10}>
                    <em className="profileSaveNote">
                      NOTE: The page will reload after you successfully updated
                      your contact number.
                    </em>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={4}>
                    <Button
                      block
                      variant="primary"
                      className="profileSave"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleNewContactClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={emailPassShow} onHide={handleEmailPassClose}>
            <Modal.Header closeButton>
              <Modal.Title>Changing Email & Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Changing Email & Password requires you to re-authenticate as you
                will modify sensitive credentials. Selecting buttons below will
                require you to enter your current password.
              </p>
              <Row className="justify-content-center">
                <Col md={4}>
                  <Button
                    block
                    className="editEmailPass"
                    onClick={() => {
                      handleEmailPassClose();
                      handleNewEmailShow();
                    }}
                  >
                    Change Email
                  </Button>
                </Col>
                <Col md={4}>
                  <Button
                    block
                    className="profileSave"
                    onClick={() => {
                      handleEmailPassClose();
                      handleNewPasswordShow();
                    }}
                  >
                    Change Password
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEmailPassClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={newEmailShow} onHide={handleNewEmailClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change User Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col className="errorHolder">
                  {errors.length > 0 && (
                    <ul>
                      {errors.map((e, index) => {
                        return <AlertError keyIndex={index} error={e} />;
                      })}
                    </ul>
                  )}
                </Col>
              </Row>

              <Form onSubmit={onEmailChange}>
                <FormInput
                  label="Please enter your current password."
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  subText="Password must be at least 6 characters"
                  pattern=".{6,}"
                  title="Must be at least 6 characters"
                  placeholder="Current Password"
                  handleChange={(e) => setCurrentPassword(e.target.value)}
                />
                <FormInput
                  label="Enter your new Email"
                  type="email"
                  name="newEmail"
                  value={newEmail}
                  placeholder="New Email"
                  handleChange={(e) => setNewEmail(e.target.value)}
                />
                <p className="text-center">
                  <em>
                    NOTE: Changing your current Email will{" "}
                    <strong>reset</strong> your chat with us. However, you can
                    still retrieve your current chat by reverting to this
                    current Email address. Please continue if you agree to this.
                  </em>
                </p>
                {/* <p>
                      <em>
                        Note: We will inform you that your email has been
                        changed by sending an email to{" "}
                        <strong>{currentUser.email}</strong>
                      </em>
                    </p> */}
                <Row className="justify-content-center">
                  <Col md={4}>
                    <Button block className="profileSave" type="submit">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleNewEmailClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          {/* <Modal
            show={warningShow}
            onHide={handleWarningClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5>Changing email will reset your current chat with us.</h5>
              <h5>Would you still like to continue your email update?</h5>
            </Modal.Body>
            <Modal.Footer>
              <Row className="justify-content-center">
                <Col md={4}>
                  <Button
                    block
                    className="editEmailPass"
                    onClick={() => {
                      handleWarningClose();
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col md={4}>
                  <Button
                    block
                    className="profileSave"
                    type="submit"
                  >
                    Yes, update email.
                  </Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Modal> */}
          <Modal show={newPasswordShow} onHide={handleNewPasswordClose}>
            <Modal.Header closeButton>
              <Modal.Title>Change User Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col className="errorHolder">
                  {errors.length > 0 && (
                    <ul>
                      {errors.map((e, index) => {
                        return <AlertError keyIndex={index} error={e} />;
                      })}
                    </ul>
                  )}
                </Col>
              </Row>

              <Form onSubmit={onPasswordChange}>
                <FormInput
                  label="Please enter your current password."
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  pattern=".{6,}"
                  title="Must be at least 6 characters"
                  placeholder="Current Password"
                  handleChange={(e) => setCurrentPassword(e.target.value)}
                />
                <FormInput
                  label="Enter your New Password"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  subText="Password must be at least 6 characters"
                  pattern=".{6,}"
                  title="Must be at least 6 characters"
                  placeholder="New Password"
                  handleChange={(e) => setNewPassword(e.target.value)}
                />
                <FormInput
                  label="Confirm your New Password"
                  type="password"
                  name="newConPassword"
                  value={newConPassword}
                  subText="Password must be at least 6 characters"
                  pattern=".{6,}"
                  title="Must be at least 6 characters"
                  placeholder="Confirm New Password"
                  handleChange={(e) => setNewConPassword(e.target.value)}
                />
                <Row className="justify-content-center">
                  <Col md={4}>
                    <Button
                      block
                      variant="primary"
                      className="profileSave"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleNewPasswordClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
