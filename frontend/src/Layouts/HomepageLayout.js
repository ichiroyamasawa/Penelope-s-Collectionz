import React from "react";
import Header from "./../Components/Header";
import Footer from "./../Components/Footer";

const HomepageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Header {...props} />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};

export default HomepageLayout;
