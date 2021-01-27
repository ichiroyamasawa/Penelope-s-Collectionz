import React from "react";
import "./styles.css";
import SignIn from "./../../Components/SignIn";
import Logo2 from "./../../Assets/PC-logo2.png";

const Login = (props) => {
  return (
    <div className="login">
      <div className="rect-bg">
        <img className="logo2" src={Logo2} alt="Penelope's Collectionz" />
      </div>
      <SignIn />
    </div>
  );
};

export default Login;
