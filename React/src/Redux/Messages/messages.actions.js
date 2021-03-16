import messageTypes from "./messages.types";

export const sendMessage = (message) => ({
  type: messageTypes.SEND_MESSAGE,
  payload: message,
});

export const sendNewMessage = (newMessage) => ({
  type: messageTypes.SEND_NEW_MESSAGE,
  payload: newMessage,
});

export const seenMessage = (docKey) => ({
  type: messageTypes.SEEN_MESSAGE,
  payload: docKey,
});

// export const checkUserExists = (email) => ({
//   type: messageTypes.CHECK_USER_EXISTS,
//   payload: email,
// });

// export const receiveMessage = (userEmail) => ({
//   type: messageTypes.RECEIVE_MESSAGE,
//   payload: userEmail,
// });

// export const setMessages = (msg) => ({
//   type: messageTypes.SET_MESSAGES,
//   payload: msg,
// });
