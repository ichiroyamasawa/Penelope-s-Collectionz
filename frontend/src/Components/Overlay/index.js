import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Overlay = ({ children, desc }) => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>{desc}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );
};

export default Overlay;
