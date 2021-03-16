import React, { useEffect } from "react";
import "./styles.css";
import { Widget, addResponseMessage } from "react-chat-widget";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "./../../Firebase/utils";

import "react-chat-widget/lib/styles.css";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const Chat = () => {
  const { currentUser } = useSelector(mapState);
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("sentAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  useEffect(() => {
    {
      // messages &&
      //   messages.map((msg) => {
      //     addResponseMessage(msg, msg.id);
      //   });
      addResponseMessage("Hello");
    }
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message through the backend API
    // addResponseMessage(response);
  };
  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Welcome Ka'Pretty!"
      subtitle="We will respond to your inquiry as fast as we can"
    />
  );
};

export default Chat;
