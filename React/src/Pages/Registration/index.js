import React, { Component } from "react";
import Signup from "./../../Components/SignUp";

import "./styles.css";

class Registration extends Component {
  render() {
    return (
      <div className="signup">
        <div className="rect-bg"></div>
        <Signup />
      </div>
    );
  }
}

export default Registration;
