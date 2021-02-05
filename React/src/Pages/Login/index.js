import React from "react";
import "./styles.css";
import SignIn from "./../../Components/SignIn";
import Logo2 from "./../../Assets/PC-logo2.png";
import BGline from "./../../Components/BGline";

const Login = (props) => {
  return (
    <div className="login">
      <BGline
        image={
          <img className="logo2" src={Logo2} alt="Penelope's Collectionz" />
        }
      />
      <SignIn />
    </div>
  );
};

export default Login;
