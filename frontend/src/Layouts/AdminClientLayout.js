import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const AdminClientLayout = (props) => {
  return (
    <div className="fullHeight">
      <Header {...props} />
      <div className="adminClientLayout">{props.children}</div>
      <Footer />
    </div>
  );
};

export default AdminClientLayout;
