import React, { useState } from "react";
import "./styles.css";
import FormInput from "./../Forms/FormInput";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Button } from "react-bootstrap";

const ChatTextBox = ({ onMessageSubmit, chatSeen }) => {
  const [message, setMessage] = useState("");
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

  const userClickedInput = () => {};
  return (
    <Row className="mr-0 chatTextArea">
      <Col>
        <FormInput
          placeholder="Type your message here..."
          onKeyUp={(e) => userTyping(e)}
          onFocus={() => chatSeen()}
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </Col>
      <Button
        size="lg"
        className="sendButton shadow-none"
        onClick={() => submitMessage()}
      >
        <i class="fa fa-paper-plane" aria-hidden="true"></i> Send
      </Button>
    </Row>
  );
};

export default ChatTextBox;
