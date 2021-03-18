import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  receiveMessage,
  sendMessage,
  seenMessage,
  sendNewMessage,
} from "./../../Redux/Messages/messages.actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row, Modal, Form, Button } from "react-bootstrap";
import "./styles.css";

import FormInput from "./../../Components/Forms/FormInput";
import AlertError from "./../../Components/AlertError";

import { firestore } from "./../../Firebase/utils";

import ChatList from "./../../Components/ChatList";
import ChatView from "./../../Components/ChatView";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  chat: state.chatData.chat.chats,
});

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [chat, setChat] = useState([]);
  const [chatListLength, setChatListLength] = useState(0);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [userDoesExists, setUserDoesExists] = useState(null);
  const [chatDoesExists, setChatDoesExists] = useState(null);
  const [chatWith, setChatWith] = useState("PCz");
  const [newMessage, setNewMessage] = useState("");
  const [newChatEmail, setNewChatEmail] = useState("");
  const [newChatFullName, setNewChatFullName] = useState("");
  const [newChatShow, setNewChatShow] = useState(false);
  const handleNewChatShow = () => setNewChatShow(true);
  const handleNewChatClose = () => {
    setNewChatShow(false);
    newChatReset();
  };
  const newChatBtnClicked = () => {
    handleNewChatShow();
    setSelectedChat(null);
    console.log("new message");
  };

  const newChatReset = () => {
    setNewMessage("");
    setNewChatEmail("");
    setChatWith("PCz");
    setUserDoesExists(null);
    setChatDoesExists(null);
    setNewChatFullName("");
  };

  const selectChat = (chatIndex) => {
    return new Promise((resolve) => {
      console.log("selected a chat", chatIndex);
      resolve(setSelectedChat(chatIndex));
    });
  };

  const chatSeen = () => {
    console.log(chat[selectedChat].users.filter((user) => user !== email)[0]);
    if (currentUser.userRoles.includes("client")) {
      const docKey = "Penelope's Collectionz:".concat(
        chat[selectedChat].users.filter(
          (user) => user !== "Penelope's Collectionz"
        )[0]
      );
      clickedMessageWhereNotSender(selectedChat, docKey);
    } else {
      const docKey = buildDocKey(
        chat[selectedChat].users.filter((user) => user !== email)[0]
      );
      clickedMessageWhereNotSender(selectedChat, docKey);
    }
  };

  const clickedMessageWhereNotSender = (chatIndex, docKey) => {
    console.log(
      chat[chatIndex].messages[chat[chatIndex].messages.length - 1].sender !==
        email
    );
    if (
      chat[chatIndex].messages[chat[chatIndex].messages.length - 1].sender !==
      email
    ) {
      dispatch(seenMessage(docKey));
    }
  };

  useEffect(() => {
    if (currentUser.userRoles.includes("client")) {
      firestore
        .collection("chats")
        .where("users", "array-contains", "Penelope's Collectionz")
        .onSnapshot(
          (res) => {
            const chats = [];
            res.forEach((doc) => {
              chats.push(doc.data());
              console.log("realtime", doc.data());
              console.log(chats);
              console.log("user is client");
              setChat(chats);
              setChatListLength(chats.length);
            });
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }

    if (!currentUser.userRoles.includes("client")) {
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
  }, [currentUser.userRoles]);

  useEffect(() => {
    setEmail(currentUser.email);
  }, []);

  const submitMessage = (msg) => {
    if (currentUser.userRoles.includes("client")) {
      const docKey = "Penelope's Collectionz:".concat(
        chat[selectedChat].users.filter(
          (user) => user !== "Penelope's Collectionz"
        )[0]
      );
      console.log(docKey);
      const message = {
        msg: msg,
        email: email,
        docKey: docKey,
      };
      dispatch(sendMessage(message));
    } else {
      const docKey = buildDocKey(
        chat[selectedChat].users.filter((user) => user !== email)[0]
      );
      // const docKey = "user1@email.com:user2@email.com";
      console.log(docKey);
      const message = {
        msg: msg,
        email: email,
        docKey: docKey,
      };
      dispatch(sendMessage(message));
    }
  };

  const submitNewMessage = (e) => {
    e.preventDefault();

    if (chatWith === "PCz") {
      createChat();
    } else if (chatWith === "others") {
      userExists();
    }
  };

  const chatExists = () => {
    return new Promise((resolve, reject) => {
      // const docKey = buildNewDocKey();
      const docKey = "Penelope's Collectionz:".concat(newChatEmail);
      console.log(docKey);
      firestore
        .collection("chats")
        .doc(docKey)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("chat exists");
            resolve(setChatDoesExists(true));
          } else {
            console.log("chat doesnt exists");
            resolve(setChatDoesExists(false));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const userExists = () => {
    return new Promise((resolve, reject) => {
      firestore
        .collection("users")
        .where("email", "==", newChatEmail)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.get("email") === newChatEmail) {
              console.log("exists", doc.data());
              setNewChatFullName(doc.data().fName + " " + doc.data().lName);
              resolve(setUserDoesExists(true));
            } else {
              console.log("USER DOE NOT EXIST");
              resolve(setUserDoesExists(false));
            }
          });
        })
        .catch((err) => {
          reject(err);
          console.log("user " + newChatEmail + " does not exists");
        });
    });
  };

  useEffect(() => {
    if (userDoesExists === true) {
      console.log("user exist!!!!");
      setUserDoesExists(null);
      chatExists();
    } else if (userDoesExists === false) {
    }
  }, [userDoesExists]);

  useEffect(() => {
    if (chatDoesExists === true) {
      console.log("chat exist!!!!");
      setChatDoesExists(null);
      goToChat();
    } else if (chatDoesExists === false) {
      console.log("chat doesnt exist!!!!!!");
      setChatDoesExists(null);
      createChat();
    }
  }, [chatDoesExists]);

  const goToChat = async () => {
    const docKey = "Penelope's Collectionz:".concat(newChatEmail);
    const usersInChat = docKey.split(":");
    console.log(usersInChat);
    const chatIdx = chat.find((_chat) =>
      usersInChat.every((_user) => _chat.users.includes(_user))
    );
    await selectChat(chat.indexOf(chatIdx));

    if (selectedChat !== null) {
      submitMessage(newMessage);
      handleNewChatClose();
    }
  };

  const createChat = () => {
    if (chatWith === "PCz") {
      const docKey = "Penelope's Collectionz:".concat(email);
      console.log("chatting with client");
      const newChat = {
        users: [email, "Penelope's Collectionz"],
        seen: false,
        custFullName: currentUser.fName + " " + currentUser.lName,
        messages: [
          {
            message: newMessage,
            sender: email,
          },
        ],
      };
      dispatch(sendNewMessage({ newChat, docKey }));
      handleNewChatClose();
    } else {
      const docKey = "Penelope's Collectionz:".concat(newChatEmail);
      const newChat = {
        users: ["Penelope's Collectionz", newChatEmail],
        seen: false,
        custFullName: newChatFullName,
        messages: [
          {
            message: newMessage,
            sender: email,
          },
        ],
      };
      dispatch(sendNewMessage({ newChat, docKey }));
      handleNewChatClose();
    }
  };

  useEffect(() => {
    console.log(selectedChat);
    if (selectedChat !== null) {
      chatSeen();
    }
  }, [selectedChat]);

  const buildDocKey = () => [email, "Penelope's Collectionz"].sort().join(":");
  // const buildNewDocKey = () => [email, newChatEmail].sort().join(":");

  return (
    <div className="maxHeight">
      <Container fluid className="maxHeight">
        <Row>
          <Col md={3} className="p-0">
            <ChatList
              chatListLength={chatListLength}
              chats={chat}
              roles={currentUser.userRoles}
              email={email}
              selectedChat={selectedChat}
              selectChat={selectChat}
              newChatBtn={newChatBtnClicked}
              // uid={currentUser.id}
            />
          </Col>
          <Modal centered show={newChatShow} onHide={handleNewChatClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Chat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitNewMessage}>
                {/* {chatWith === "" && (
                  <>
                    <h3 className="text-center">
                      Hi! To start a new chat, select one of the following
                      buttons below.
                    </h3>
                    <Button onClick={() => setChatWith("PCz")}>
                      Chat with Penelope's Collectionz
                    </Button>
                    <Button onClick={() => setChatWith("others")}>
                      Chat with other users
                    </Button>
                  </>
                )}*/}

                {chatWith === "PCz" && (
                  <>
                    {currentUser.userRoles.includes("client") && (
                      <>
                        <h3 className="text-center">Chat with Customers</h3>
                        <Row className="justify-content-center">
                          <Col md="auto" className="mb-5 ">
                            <Button
                              className="profileSave"
                              onClick={() => setChatWith("others")}
                            >
                              <i class="fa fa-comments" aria-hidden="true"></i>{" "}
                              Chat with Customers
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                    <h3 className="text-center">
                      Chat with Penelope's Collectionz
                    </h3>
                    <FormInput
                      label="Message:"
                      as="textarea"
                      name="newMessage"
                      value={newMessage}
                      placeholder="Enter your message here..."
                      handleChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Row className="justify-content-center">
                      <Col md={4}>
                        <Button block className="profileSave" type="submit">
                          <i class="fa fa-paper-plane" aria-hidden="true"></i>{" "}
                          Send Chat
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
                {chatWith !== "PCz" && (
                  //  userDoesExists !== false &&
                  <>
                    {userDoesExists === false && (
                      <AlertError error="This user doesn't exist." />
                    )}
                    {userDoesExists !== false && (
                      <>
                        <FormInput
                          label="Chat with other users by entering his/her email."
                          type="email"
                          name="newChatEmail"
                          value={newChatEmail}
                          placeholder="User's email"
                          handleChange={(e) => setNewChatEmail(e.target.value)}
                        />
                        <FormInput
                          label="Message:"
                          as="textarea"
                          name="newMessage"
                          value={newMessage}
                          placeholder="Enter your message here..."
                          handleChange={(e) => setNewMessage(e.target.value)}
                        />
                        <h5 className="text-center">
                          <em>
                            NOTE: Message wouldn't be created if the user
                            doesn't exists.
                          </em>
                        </h5>
                        <Row className="justify-content-center">
                          <Col md={4}>
                            <Button block className="profileSave" type="submit">
                              <i
                                class="fa fa-paper-plane"
                                aria-hidden="true"
                              ></i>{" "}
                              Send Chat
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleNewChatClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Col className="p-0">
            {selectedChat !== null && (
              <ChatView
                chatSeen={chatSeen}
                chat={chat[selectedChat]}
                roles={currentUser.userRoles}
                email={email}
                onMessageSubmit={submitMessage}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatScreen;
