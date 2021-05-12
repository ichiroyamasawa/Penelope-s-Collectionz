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
  search,
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

    if (filterType) {
      if (filterType == "earrings") {
        ref = ref.where("Prod_Category", "in", [
          "earrings-drop",
          "earrings-hook",
          "earrings-stud",
        ]);
      } else if (filterType == "hair") {
        ref = ref.where("Prod_Category", "in", [
          "hair-snapclips",
          "hair-turban",
        ]);
      } else if (filterType == "baby") {
        ref = ref.where("Prod_Category", "in", ["baby-beanie_diaper_set"]);
      } else if (filterType == "home_personal") {
        ref = ref.where("Prod_Category", "in", [
          "home_personal-alcoholders",
          "home_personal-coasters",
          "home_personal-penholder",
        ]);
      } else {
        ref = ref.where("Prod_Category", "==", filterType);
        console.log("prod");
      }
    }
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
    // if (startBeforeDoc)
    //   ref = ref.limitToLast(pageSize).endBefore(startBeforeDoc);
    if (search) {
      const searchLC = search.toLowerCase();
      ref = ref.where("Prod_Tags", "array-contains", searchLC);
      console.log(searchLC, "search1");
    }

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
          resolve({
            ...snapshot.data(),
            Prod_Code: Prod_Code,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchBestSellers = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .orderBy("Prod_Sales", "desc")
      .get()
      .then((snapshot) => {
        const bestSellersArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            Prod_Code: doc.id,
          };
        });
        resolve(bestSellersArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
