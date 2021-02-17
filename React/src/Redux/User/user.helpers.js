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

export const handleFetchUsers = ({
  startAfterDoc,
  persistUsers = [], //infinite Scroll
  //startBeforeDoc,
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 5;
    let ref = firestore
      .collection("users")
      .limit(pageSize)
      .orderBy("createdDate", "desc");

    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;
        const data = [
          ...persistUsers, //infinite Scroll
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              UserID: doc.id,
            };
          }),
        ];
        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < pageSize,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
