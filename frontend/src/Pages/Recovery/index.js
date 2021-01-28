import React from "react";
import "./styles.css";
import PasswordRecovery from "./../../Components/PasswordRecovery";
import BGline from "./../../Components/BGline";

const Recovery = (props) => {
  return (
    <div className="recovery">
      <BGline />
      <PasswordRecovery />
    </div>
  );
};

export default Recovery;
