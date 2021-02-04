import { firestore } from "./../../Firebase/utils";

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProducts = ({ filterType }) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("products").orderBy("Prod_CreatedDate");

    if (filterType) ref = ref.where("Prod_Category", "==", filterType);

    ref
      .get()
      .then((snapshot) => {
        const productsArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            Prod_Code: doc.id,
          };
        });
        resolve(productsArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteProduct = (Prod_Code) => {
  console.log(Prod_Code, 1);
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(Prod_Code)
      .delete()
      .then(() => {
        console.log(Prod_Code, 2);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
