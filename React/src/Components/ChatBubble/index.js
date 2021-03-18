import React, { useEffect, useState } from "react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { firestore } from "./../../Firebase/utils";
import ChatWindow from "./ChatWindow";
import {
  sendMessage,
  sendNewMessage,
  seenMessage,
} from "./../../Redux/Messages/messages.actions";

import "bootstrap/dist/css/bootstrap.min.css";
import { Popover, OverlayTrigger, Badge, Modal, Button } from "react-bootstrap";

import "react-chat-widget/lib/styles.css";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});

const ChatBubble = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [showChatbox, setShowChatbox] = useState(false);

  const handleShowChatbox = () => setShowChatbox(true);
  const handleCloseChatbox = () => setShowChatbox(false);
  const [chat, setChat] = useState([]);
  const [chatListLength, setChatListLength] = useState(0);

  const [chatDoesExists, setChatDoesExists] = useState(false);

  const [verifyModal, setVerifyModal] = useState(false);
  const handleCloseVerifyModal = () => setVerifyModal(false);
  const handleShowVerifyModal = () => setVerifyModal(true);

  useEffect(() => {
    if (
      currentUser !== null &&
      !currentUser.userRoles.includes("admin") &&
      !currentUser.userRoles.includes("client")
    ) {
      firestore
        .collection("chats")
        //.where("email", "==", currentUser.id)
        .where("users", "array-contains", currentUser.email)
        .onSnapshot(
          (res) => {
            const chats = [];
            res.forEach((doc) => {
              chats.push(doc.data());
              console.log("realtime", doc.data());
              console.log(chats);

              setChat(chats);
              setChatListLength(chats.length);
            });
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }
    console.log(chat, "chat");
  }, [currentUser]);

  const buildDocKey = (msg) =>
    [currentUser.email, "Penelope's Collectionz"].sort().join(":");

  const submitMessage = (msg) => {
    if (chat.length === 0) {
      const docKey = "Penelope's Collectionz:".concat(currentUser.email);
      console.log("chatting with client");
      const newChat = {
        users: [currentUser.email, "Penelope's Collectionz"],
        seen: false,
        custFullName: currentUser.fName + " " + currentUser.lName,
        messages: [
          {
            message: msg,
            sender: currentUser.email,
          },
        ],
      };
      dispatch(sendNewMessage({ newChat, docKey }));
    } else {
      const docKey = buildDocKey();
      console.log(docKey);
      const message = {
        msg: msg,
        email: currentUser.email,
        docKey: docKey,
      };
      dispatch(sendMessage(message));
    }
  };

  const chatSeen = () => {
    const docKey = buildDocKey();
    clickedMessageWhereNotSender(docKey);
  };
  const clickedMessageWhereNotSender = (docKey) => {
    if (
      chat[0] !== undefined &&
      chat[0].messages[chat[0].messages.length - 1].sender !== currentUser.email
    ) {
      dispatch(seenMessage(docKey));
    }
  };

  return (
    <div>
      {currentUser !== null &&
        !currentUser.userRoles.includes("admin") &&
        !currentUser.userRoles.includes("client") && (
          <div>
            <OverlayTrigger
              trigger={["hover", "focus"]}
              placement="left"
              overlay={
                <Popover>
                  <Popover.Title as="h1">Chat with Us!</Popover.Title>
                  <Popover.Content>
                    Click here and let's talk about your inquiries!
                  </Popover.Content>
                </Popover>
              }
            >
              <div
                className="chatPopupButton"
                onClick={() => {
                  if (currentUser.emailVerified) {
                    if (showChatbox !== true) {
                      handleShowChatbox();
                      chatSeen();
                    } else {
                      handleCloseChatbox();
                    }
                  } else {
                    handleShowVerifyModal();
                  }
                }}
              >
                {showChatbox ? (
                  <h3>
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </h3>
                ) : (
                  <h3>
                    <i class="fas fa-comments    "></i>
                  </h3>
                )}
              </div>
            </OverlayTrigger>
            {showChatbox ? (
              <ChatWindow
                chatSeen={chatSeen}
                roles={currentUser.userRoles}
                chats={chat}
                email={currentUser.email}
                onMessageSubmit={submitMessage}
              />
            ) : null}
            <div className="chatNotif">
              {Array.isArray(chat) &&
                chat.length > 0 &&
                chat[0].seen === false &&
                chat[0].messages[chat[0].messages.length - 1].sender !==
                  currentUser.email && (
                  <Badge pill variant="danger">
                    New
                  </Badge>
                )}
            </div>
          </div>
        )}{" "}
      <Modal show={verifyModal} onHide={handleCloseVerifyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Oops! You account hasn't verified yet.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Before accessing this content, please make sure that you have your{" "}
          <strong>email verified</strong> first by clicking the caution icon{" "}
          {"("}
          <span className="cautionConstraints">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
          {")"} in your header above.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVerifyModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

    // <Widget
    //   handleNewUserMessage={handleNewUserMessage}
    //   title="Welcome Ka'Pretty!"
    //   subtitle="We will respond to your inquiry as fast as we can"
    // />
  );
};

export default ChatBubble;
