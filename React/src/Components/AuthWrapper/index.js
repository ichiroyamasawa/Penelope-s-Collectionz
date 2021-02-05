import React from "react";
import "./styles.css";

const AuthWrapper = ({ headline, icon, className, children }) => {
  return (
    <div className="authWrapper">
      <div className="wrap">
        <div className="rect">
          {icon && <h1>{icon}</h1>}
          {headline && <h2> {headline}</h2>}

          <div className="children">{children && children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
