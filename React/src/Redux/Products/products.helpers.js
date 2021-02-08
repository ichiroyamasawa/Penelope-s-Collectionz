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

export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [], //infinite Scroll
  //startBeforeDoc,
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 5;
    let ref = firestore
      .collection("products")
      .orderBy("Prod_CreatedDate")
      .limit(pageSize);

    if (filterType) ref = ref.where("Prod_Category", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
    // if (startBeforeDoc)
    //   ref = ref.limitToLast(pageSize).endBefore(startBeforeDoc);

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;
        const data = [
          ...persistProducts, //infinite Scroll
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              Prod_Code: doc.id,
            };
          }),
        ];
        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          //queryBeforeDoc: snapshot.docs[totalCount - pageSize],
          isLastPage: totalCount < pageSize,
        });
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

export const handleEditProduct = (products) => {
  console.log(products, 1);
  console.log("Malapit na maag alas tres ", products.Prod_Code);
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(products.Prod_Code)
      .update(products)
      .then(() => {
        console.log(products, 2);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
