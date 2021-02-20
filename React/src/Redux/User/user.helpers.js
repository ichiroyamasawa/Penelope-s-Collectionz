import { auth, admin } from "./../../Firebase/utils";
import { firestore } from "./../../Firebase/utils";

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. Please try again."];
        reject(err);
      });
  });
};

export const handleFetchUsers = () =>
  //   {
  //   // startAfterDoc,
  //   persistUsers = [], //infinite Scroll
  //   //startBeforeDoc,
  // }
  {
    return new Promise((resolve, reject) => {
      // const pageSize = 5;
      console.log("helloooo", 7);
      // let ref =
      firestore
        .collection("users")
        .get()
        .then((snapshot) => {
          const usersArray = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              UserID: doc.id,
            };
          });
          resolve(usersArray);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const handleDeleteUser = (UserID) => {
  console.log(UserID, 1);
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(UserID)
      .delete()
      .then(() => {
        console.log(UserID, 2);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
