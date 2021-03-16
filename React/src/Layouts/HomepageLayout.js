import React from "react";
import Header from "./../Components/Header";
import Chat from "./../Components/Chat";
import Footer from "./../Components/Footer";
import "./../Components/Sidebar/styles.css";

const HomepageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Header {...props} />
      <main className="main">{props.children}</main>
      {/* <Chat /> */}
      <Footer />
    </div>
  );
};

export default HomepageLayout;
