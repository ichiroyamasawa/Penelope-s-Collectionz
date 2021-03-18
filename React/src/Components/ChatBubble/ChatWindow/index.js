import React, { useEffect, useState } from "react";
import "./styles.css";

import FormInput from "./../../Forms/FormInput";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Container } from "react-bootstrap";

const ChatWindow = ({ roles, chats, email, onMessageSubmit, chatSeen }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const container = document.getElementById("messageBoxContainer");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  });

  const submitMessage = () => {
    if (messageValid(message)) {
      onMessageSubmit(message);
    }
    setMessage("");
  };

  const userTyping = (e) => {
    console.log("user typing...");
    if (e.keyCode === 13) {
      submitMessage();
    }
  };

  const messageValid = (txt) => txt && txt.replace(/\s/g, "").length;
  return (
    <div className="chatWindow">
      <div className="chatWindowHeader">
        <h5>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </h5>
        Welcome Ka'Pretty! <br />{" "}
        <span className="chatWindowSub">
          We will respond to your inquiry as fast as we can
        </span>
      </div>

      <div id="messageBoxContainer">
        {
          // !roles.includes("client") &&
          Array.isArray(chats) && chats.length === 0 && (
            <h3 className="noChatYet">
              You have no messages yet. Start chatting with us right now!
            </h3>
          )
        }
        {chats[0] !== undefined &&
          Array.isArray(chats[0].messages) &&
          chats[0].messages.length > 0 &&
          chats[0].messages.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  item.sender === email ? "userSent messageFlex" : "friendSent"
                }
              >
                <div className="message">
                  <p>{item.message}</p>
                </div>
              </div>
            );
          })}
      </div>
      <Container fluid className="p-0 m-0">
        <Row className="p-0 m-0">
          <Col className="p-0">
            <input
              type="text"
              onKeyUp={(e) => userTyping(e)}
              className="chatWindowsTextbox"
              name="message"
              value={message}
              onFocus={() => chatSeen()}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </Col>
          <Col className="p-0 text-right">
            <Button
              size="lg"
              className="sendButton shadow-none"
              onClick={() => submitMessage(message)}
            >
              <i class="fa fa-paper-plane" aria-hidden="true"></i> Send
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatWindow;
