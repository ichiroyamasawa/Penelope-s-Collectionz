import { firestore } from "./../../Firebase/utils";

export const handleSaveCart = (cart) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("carts")
      .doc(cart.userID)
      .set(cart)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleRetrieveCart = (userID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("carts")
      .doc(userID)
      .get()
      .then((snap) => {
        var cartItems = [];
        if (snap.exists) {
          {
            cartItems.push(snap.data().cartItems);
            console.log(cartItems[0]);
            resolve(cartItems[0]);
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
