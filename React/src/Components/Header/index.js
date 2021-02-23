import React, { useState, useEffect } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import BtnPink from "./../Forms/ButtonPink";
import BtnIcons from "../Forms/ButtonIcons/BtnIcons";

import { useSelector, useDispatch } from "react-redux";
import {
  emailVerificationStart,
  signOutUserStart,
  resetUserState,
} from "./../../Redux/User/user.actions";

import { selectCartItemsCount } from "./../../Redux/Cart/cart.selectors";

import { Link, useHistory } from "react-router-dom";

import Overlay from "./../Overlay";

// Bootstrap Imports
import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Popover,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

// Media Imports
import Logo from "./../../Assets/PC-logo1.png";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state),
});

const Header = (props) => {
  const [show, setShow] = useState(false);

  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const reset = () => {
    dispatch(resetUserState());
  };

  const onVerification = (e) => {
    e.preventDefault();
    setShow(true);
    dispatch(emailVerificationStart());
    console.log(currentUser.emailVerified);
  };

  return (
    <Container fluid className="p-0">
      <Navbar collapseOnSelect expand="lg" className="p-0 mainNav">
        <Col
          md={{ span: 4, offset: 0 }}
          xs={{ span: 12, offset: 0, order: "first" }}
          className="xs-only-text-center"
        >
          <Navbar.Brand>
            <Link to="/">
              <img className="logo1" src={Logo} alt="Penelope's Collectionz" />
            </Link>
          </Navbar.Brand>
        </Col>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Col>
            <Nav fill>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/">Products</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/aboutUs">About Us</Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/contactUs">Contact Us</Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Navbar.Collapse>
        <Col
          xs={(10, { order: "third" })}
          md={4}
          className="xs-only-text-center"
        >
          <Nav fill className="justify-content-end">
            <div className="callToActions">
              {currentUser && (
                <ul>
                  {!currentUser.emailVerified && (
                    <>
                      <li>
                        <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="bottom"
                          overlay={
                            <Popover>
                              <Popover.Title as="h3">
                                Verify your account now!
                              </Popover.Title>
                              <Popover.Content>
                                Verifying your email allows you to{" "}
                                <strong>chat with us</strong>,{" "}
                                <strong>order your desired products</strong>,{" "}
                                and <strong>manage your profile.</strong>
                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <Nav.Item>
                            <BtnIcons
                              className="caution shadow-none"
                              type="submit"
                              onClick={onVerification}
                            >
                              <i class="fas fa-exclamation-triangle"></i>
                            </BtnIcons>
                          </Nav.Item>
                        </OverlayTrigger>
                      </li>

                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Verification Email Sent!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modalDesc">
                          We have sent an email to{" "}
                          <span className="emailToVerify">
                            {currentUser.email}
                          </span>
                          .
                          <p className="modalDescEmailText">
                            Verifying your email allows you to chat with us,
                            order your desired products, and manage your
                            profile.
                          </p>
                          <p className="modalDescEmailText">
                            After verifying your email, please reload the page
                            or click the button below.
                          </p>
                          <p className="modalDescEmailTextNote">
                            Note: If you have not received the verification
                            email, please check your "Spam" folder.
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <BtnPink onClick={() => window.location.reload()}>
                            Reload this page
                          </BtnPink>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}

                  <li>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="bottom"
                      overlay={
                        <Popover>
                          <Popover.Title as="h3">Chat with Us!</Popover.Title>
                          <Popover.Content>
                            Click here and let's talk about your inquiries!
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Nav.Item>
                        <Link to="/">
                          <BtnIcons type="submit">
                            <i class="fa fa-comments" aria-hidden="true"></i>
                          </BtnIcons>
                        </Link>
                      </Nav.Item>
                    </OverlayTrigger>
                  </li>

                  <li>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="bottom"
                      overlay={
                        <Popover>
                          <Popover.Title as="h3">My Cart</Popover.Title>
                          <Popover.Content>
                            Your cart has{" "}
                            <strong>{totalNumCartItems} items</strong>!
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Nav.Item>
                        <Link to="/">
                          <BtnIcons type="submit">
                            <i
                              class="fa fa-shopping-cart"
                              aria-hidden="true"
                            ></i>
                          </BtnIcons>
                        </Link>
                      </Nav.Item>
                    </OverlayTrigger>
                  </li>

                  <li>
                    <OverlayTrigger
                      trigger={["hover", "focus"]}
                      placement="bottom"
                      overlay={
                        <Popover>
                          <Popover.Title as="h3">My Profile</Popover.Title>
                          <Popover.Content>
                            Click here to customize your profile!
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Nav.Item>
                        <Link to="/dashboard">
                          <BtnIcons type="submit">
                            <i class="fa fa-user-circle" aria-hidden="true"></i>
                          </BtnIcons>
                        </Link>
                      </Nav.Item>
                    </OverlayTrigger>
                  </li>
                  <li>
                    <Nav.Item>
                      <Link to="/">
                        <BtnPink type="submit" onClick={() => signOut()}>
                          Logout
                        </BtnPink>
                      </Link>
                    </Nav.Item>
                  </li>
                </ul>
              )}

              {!currentUser && (
                <ul>
                  <li>
                    <Nav.Link>
                      <Link to="/registration">
                        <BtnPink type="submit" onClick={() => reset()}>
                          Register
                        </BtnPink>
                      </Link>
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link>
                      <Link to="/login">
                        <BtnPink type="submit" onClick={() => reset()}>
                          Login
                        </BtnPink>
                      </Link>
                    </Nav.Link>
                  </li>
                </ul>
              )}
            </div>
          </Nav>
        </Col>
      </Navbar>
    </Container>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
