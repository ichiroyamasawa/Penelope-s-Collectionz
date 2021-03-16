import messageTypes from "./messages.types";

const INITIAL_STATE = {
  chat: [],
};

const messagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case messageTypes.SET_MESSAGES:
      return {
        ...state,
        chat: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
