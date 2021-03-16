import { firestore, fieldVal } from "./../../Firebase/utils";
import { setMessages } from "./messages.actions";

// export const handleReceiveMessage = (email) => {
//   return new Promise((resolve, reject) => {
//     firestore
//       .collection("chats")
//       .where("users", "array-contains", email)
//       .onSnapshot(
//         (res) => {
//           const chats = [];
//           res.forEach((doc) => {
//             chats.push(doc.data());
//             console.log("realtime", doc.data());
//             console.log(chats);
//           });
//           resolve({ chats });
//         },
//         (err) => {
//           reject(err);
//           console.log(`Encountered error: ${err}`);
//         }
//       );
//   });
// };

export const handleSendMessage = (message) => {
  console.log(message, "not yet passed");
  console.log(message.docKey, 1);
  console.log(message.email, 2);
  console.log(message.msg, 3);
  return new Promise((resolve, reject) => {
    firestore
      .collection("chats")
      .doc(message.docKey)
      .update({
        messages: fieldVal.arrayUnion({
          sender: message.email,
          message: message.msg,
          timestamp: new Date(),
        }),
        seen: false,
      })
      .then(() => {
        console.log(message, "123123");
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleSeenMessage = (docKey) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("chats")
      .doc(docKey)
      .update({ seen: true })
      .then(() => {
        resolve();
        console.log("seen message");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleSendNewMessage = (newMessage) => {
  return new Promise((resolve, reject) => {
    console.log(newMessage);
    firestore
      .collection("chats")
      .doc(newMessage.docKey)
      .set(newMessage.newChat, { timestamp: new Date() })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
