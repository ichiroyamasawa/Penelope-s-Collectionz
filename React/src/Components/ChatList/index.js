import React, { useState, useEffect } from "react";
import "./styles.css";
import BtnPink from "./../../Components/Forms/ButtonPink";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, Row, Col, Container, Button, Badge } from "react-bootstrap";
import Avatar from "react-avatar";

const ChatList = ({
  chats,
  email,
  selectChat,
  newChatBtn,
  selectedChat,
  roles,
  fullName,
}) => {
  return (
    <div className="chatList">
      <h1 className="chatList-Title">Chat List</h1>
      <div className="messageBtnHolder">
        {!roles.includes("client") &&
          Array.isArray(chats) &&
          chats.length === 0 && (
            <Button
              className="messageBtn btn-lg shadow-none"
              size="lg"
              block
              onClick={() => {
                newChatBtn();
              }}
            >
              New Message
            </Button>
          )}
        {roles.includes("client") && (
          <Button
            className="messageBtn btn-lg shadow-none"
            size="lg"
            block
            onClick={() => {
              newChatBtn();
            }}
          >
            New Message
          </Button>
        )}
      </div>
      <div>
        <ListGroup className="mt-3">
          {Array.isArray(chats) && chats.length > 0 ? (
            chats.map((item, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  onClick={() => selectChat(index)}
                  action={selectedChat === index}
                  href={"#" + index}
                >
                  <Row className="align-items-center">
                    <Col md="auto">
                      {roles.includes("client") && (
                        <Avatar
                          name={
                            item.users.filter(
                              (user) => user !== "Penelope's Collectionz"
                            )[0]
                          }
                          size={40}
                          textSizeRatio={2}
                          round
                        />
                      )}
                      {!roles.includes("client") && (
                        <Avatar
                          name={item.users.filter((user) => user !== email)[0]}
                          size={40}
                          textSizeRatio={2}
                          round
                        />
                      )}
                    </Col>
                    <Col className="p-0">
                      <Container>
                        <Row>
                          <Col className="p-0">
                            {roles.includes("client") && (
                              <>
                                <h5>
                                  <strong>{item.custFullName}</strong>
                                </h5>
                                <p>
                                  {item.users.filter(
                                    (user) => user !== "Penelope's Collectionz"
                                  )[0].length > 18
                                    ? item.users
                                        .filter(
                                          (user) =>
                                            user !== "Penelope's Collectionz"
                                        )[0]
                                        .substring(0, 18)
                                        .concat("...")
                                    : item.users.filter(
                                        (user) =>
                                          user !== "Penelope's Collectionz"
                                      )[0]}
                                </p>
                              </>
                            )}
                            {!roles.includes("client") && (
                              <h5>
                                {item.users.filter((user) => user !== email)[0]}
                              </h5>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col className="p-0">
                            <p>
                              {item.messages[item.messages.length - 1].message
                                .length > 25
                                ? item.messages[
                                    item.messages.length - 1
                                  ].message
                                    .substring(0, 25)
                                    .concat("...")
                                : item.messages[item.messages.length - 1]
                                    .message}
                            </p>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                    {item.seen === false &&
                      item.messages[item.messages.length - 1].sender !==
                        email && (
                        <Col md="auto">
                          <Badge pill variant="danger">
                            New
                          </Badge>{" "}
                        </Col>
                      )}
                  </Row>
                </ListGroup.Item>
              );
            })
          ) : (
            <h1 className="text-center mt-5">You have no messages yet.</h1>
          )}
        </ListGroup>
      </div>
    </div>
  );
};

export default ChatList;
