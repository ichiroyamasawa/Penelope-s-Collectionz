import React, { useEffect } from "react";
import "./styles.css";
import Avatar from "react-avatar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

import ChatTextBox from "./../ChatTextBox";

const ChatView = ({ chat, email, onMessageSubmit, chatSeen, roles }) => {
  useEffect(() => {
    const container = document.getElementById("messageContainer");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  });
  return (
    <div className="chatView">
      {roles !== null &&
        roles.includes("client") &&
        Array.isArray(chat.messages) &&
        chat.messages.length > 0 && (
          <div className="chatHeader">
            Your conversation with <strong>{chat.custFullName}</strong> {"("}
            {chat.users.filter((usr) => usr !== "Penelope's Collectionz")[0]}
            {")"}
          </div>
        )}
      {roles !== null &&
        !roles.includes("client") &&
        Array.isArray(chat.messages) &&
        chat.messages.length > 0 && (
          <div className="chatHeader">
            Your conversation with{" "}
            <strong>{chat.users.filter((usr) => usr !== email)[0]}</strong>
          </div>
        )}

      <div id="messageContainer">
        {Array.isArray(chat.messages) &&
          chat.messages.length > 0 &&
          chat.messages.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  item.sender === email ? "userSent messageFlex" : "friendSent"
                }
              >
                {/* <Avatar
                  name={item.sender}
                  size={40}
                  textSizeRatio={2}
                  round
                  className="chatAvatar"
                /> */}
                <div className="message">
                  <p>{item.message}</p>
                  {/* <p>{item.sender}</p>
                  <p>{email}</p> */}
                </div>
              </div>
            );
          })}
      </div>
      <ChatTextBox chatSeen={chatSeen} onMessageSubmit={onMessageSubmit} />
    </div>
  );
};

export default ChatView;
