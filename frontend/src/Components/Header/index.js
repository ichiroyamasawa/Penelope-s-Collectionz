import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BtnPink from "./../Forms/ButtonPink";
import BtnIcons from "../Forms/ButtonIcons/BtnIcons";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { auth } from "./../../Firebase/utils";

// Bootstrap Imports
import { Container, Row, Col, Button } from "react-bootstrap";

// Media Imports
import Logo from "./../../Assets/PC-logo1.png";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);

  return (
    <header className="header">
      <div className="wrap">
        <div>
          <Link to="/">
            <img className="logo1" src={Logo} alt="Penelope's Collectionz" />
          </Link>
        </div>

        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <Link to="/">
                  <BtnIcons type="submit">
                    <i class="fa fa-comments" aria-hidden="true"></i>
                  </BtnIcons>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <BtnIcons type="submit">
                    <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                  </BtnIcons>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <BtnIcons type="submit">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                  </BtnIcons>
                </Link>
              </li>
              <li>
                <BtnPink type="submit" onClick={() => auth.signOut()}>
                  Logout
                </BtnPink>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">
                  <BtnPink type="submit">Register</BtnPink>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <BtnPink type="submit">Login</BtnPink>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
