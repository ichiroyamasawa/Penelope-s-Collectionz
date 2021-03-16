import React from "react";
import Header from "./../Components/Header";
import Chat from "./../Components/Chat";
import Footer from "./../Components/Footer";

const MainLayout = (props) => {
  return (
    <div className="fullHeight">
      <Header {...props} />
      <div className="main">{props.children}</div>
      {/* <Chat /> */}
      <Footer />
    </div>
  );
};

export default MainLayout;
