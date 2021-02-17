import { firestore } from "./../../Firebase/utils";
import { storage } from "./../../Firebase/utils";

// export const handleAddProductImage = (Prod_Image) => {
//   return new Promise((resolve, reject) => {
//     const uploadTask = storage.ref(`Prod_Images/${Prod_Image.name}`).put(Prod_Image);
//       uploadTask.on()

//     })
// };

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
  sorterType,
  startAfterDoc,
  persistProducts = [], //infinite Scroll
  //startBeforeDoc,
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 5;
    let ref = firestore
      .collection("products")
      .limit(pageSize)
      .orderBy("Prod_CreatedDate", "desc");

    // console.log(ref);
    // if (sorterType) {
    //   console.log("sorterType:" + sorterType);
    //   ref = ref.orderBy(sorterType);
    //   console.log(ref);
    //   // } else if (!sorterType) {
    //   //   console.log("sorterType: latest");
    //   //   ref = ref.orderBy("Prod_CreatedDate", "desc");
    // }

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

export const handleFetchProduct = (Prod_Code) => {
  return new Promise((resolve, reject) => {
    console.log(Prod_Code, 1);
    firestore
      .collection("products")
      .doc(Prod_Code)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve(snapshot.data());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
