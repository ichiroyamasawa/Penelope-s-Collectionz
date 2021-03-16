import messageTypes from "./messages.types";
import { setMessages, receiveMessage } from "./messages.actions";
import {
  handleReceiveMessage,
  handleSendMessage,
  handleSeenMessage,
  handleSendNewMessage,
} from "./messages.helpers";
import { takeLatest, put, all, call, take } from "redux-saga/effects";

// export function* receiveMessages({ payload }) {
//   try {
//     console.log(payload, 12313132);
//     var chat = yield handleReceiveMessage(payload);
//     yield put(setMessages(chat));
//   } catch (err) {
//     console.log(err);
//   }
// }
// export function* onReceiveMessages() {
//   yield takeLatest(messageTypes.RECEIVE_MESSAGE, receiveMessages);
// }

export function* sendMessage({ payload }) {
  try {
    console.log(payload.email, 999);
    yield handleSendMessage(payload);
  } catch (err) {
    console.log(err);
  }
}

export function* seenMessage({ payload }) {
  try {
    yield handleSeenMessage(payload);
  } catch (err) {
    console.log(err);
  }
}

export function* onSeenMessage() {
  yield takeLatest(messageTypes.SEEN_MESSAGE, seenMessage);
}

export function* onSendMessage() {
  yield takeLatest(messageTypes.SEND_MESSAGE, sendMessage);
}

export function* sendNewMessage({ payload }) {
  try {
    yield handleSendNewMessage(payload);
  } catch (err) {
    console.log(err);
  }
}

export function* onSendNewMessage() {
  yield takeLatest(messageTypes.SEND_NEW_MESSAGE, sendNewMessage);
}

// export function* checkUserExists({ payload }) {
//   try {
//     yield;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export function* onCheckUserExists() {
//   yield takeLatest(messageTypes.CHECK_USER_EXISTS, checkUserExists);
// }
export default function* messagesSagas() {
  yield all([
    // call(onReceiveMessages),
    call(onSendMessage),
    call(onSendNewMessage),
    call(onSeenMessage),
    // call(onCheckUserExists),
  ]);
}
