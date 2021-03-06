import { firestore } from "./../../Firebase/utils";

export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("orders")
      .orderBy("orderCreatedDate", "desc");

    ref = ref.where("orderUserID", "==", uid);

    ref
      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              orderID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })

      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetClientOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .orderBy("orderCreatedDate", "desc")
      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              orderID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })

      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .get()
      .then((snap) => {
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentID: orderID,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateSale = (Prod_Code) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("products").doc(Prod_Code.product.Prod_Code);
    return firestore
      .runTransaction((transaction) => {
        return transaction.get(ref).then((doc) => {
          if (!doc.exists) {
            throw "Product does not exist!";
          }
          var newSale = doc.data().Prod_Sales + Prod_Code.quantity;
          transaction.update(ref, { Prod_Sales: newSale });
        });
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateStock = (Prod_Code) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("products").doc(Prod_Code.product.Prod_Code);
    return firestore
      .runTransaction((transaction) => {
        return transaction.get(ref).then((doc) => {
          if (!doc.exists) {
            throw "Product does not exist!";
          }
          if (doc.data().Prod_Stock >= Prod_Code.quantity) {
            var newStock = doc.data().Prod_Stock - Prod_Code.quantity;
            transaction.update(ref, { Prod_Stock: newStock });
          }
        });
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleOrderComplete = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .update({ orderCompleted: true })
      .then(() => {
        console.log(orderID, "now updated");
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
