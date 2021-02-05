import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BtnPink from "./../Forms/ButtonPink";
import BtnIcons from "../Forms/ButtonIcons/BtnIcons";

import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserStart,
  resetUserState,
} from "./../../Redux/User/user.actions";

import { Link, useHistory } from "react-router-dom";

import Overlay from "./../Overlay";

// Bootstrap Imports
import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

// Media Imports
import Logo from "./../../Assets/PC-logo1.png";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const reset = () => {
    dispatch(resetUserState());
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
                  <Overlay desc="Chat with Penelope's Collectionz!">
                    <li>
                      <Nav.Item>
                        <Link to="/">
                          <BtnIcons type="submit">
                            <i class="fa fa-comments" aria-hidden="true"></i>
                          </BtnIcons>
                        </Link>
                      </Nav.Item>
                    </li>
                  </Overlay>
                  <Overlay desc="My Cart">
                    <li>
                      <Nav.Item>
                        <Link to="/">
                          <BtnIcons type="submit">
                            <i
                              class="fa fa-shopping-bag"
                              aria-hidden="true"
                            ></i>
                          </BtnIcons>
                        </Link>
                      </Nav.Item>
                    </li>
                  </Overlay>
                  <Overlay desc="My Profile">
                    <li>
                      <Nav.Item>
                        <Link to="/dashboard">
                          <BtnIcons type="submit">
                            <i class="fa fa-user-circle" aria-hidden="true"></i>
                          </BtnIcons>
                        </Link>
                      </Nav.Item>
                    </li>
                  </Overlay>
                  <li>
                    <Nav.Item>
                      <BtnPink type="submit" onClick={() => signOut()}>
                        Logout
                      </BtnPink>
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
