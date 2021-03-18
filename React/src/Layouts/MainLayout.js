import React from "react";
import Header from "./../Components/Header";
import ChatBubble from "./../Components/ChatBubble";
import Footer from "./../Components/Footer";

const MainLayout = (props) => {
  return (
    <div className="fullHeight">
      <Header {...props} />
      <div className="main">{props.children}</div>
      <ChatBubble />
      <Footer />
    </div>
  );
};

export default MainLayout;
