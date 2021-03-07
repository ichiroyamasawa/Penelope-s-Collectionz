import { takeLatest, put, all, call, take } from "redux-saga/effects";
import {
  setProducts,
  setProduct,
  fetchProductsStart,
  setBestSellers,
} from "./products.actions";
import productsTypes from "./products.types";
import productTypes from "./products.types";
import { auth } from "./../../Firebase/utils";
import {
  handleAddProduct,
  // handleAddProductImage,
  handleFetchProducts,
  handleDeleteProduct,
  handleEditProduct,
  handleFetchProduct,
  handleFetchBestSellers,
} from "./products.helpers";

export function* addProduct({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      ...payload,
      Prod_CreatedDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

// export function* addProductImage({payload}){
//   try{
//     yield handleAddProductImage(payload);
//   }
//   catch(err){
//     console.log(err)
//   }
// }

// export function* onAddProductImage() {
//   yield takeLatest(productsTypes.ADD_NEW_PRODUCT_IMAGE, addProductImage);
// }

export function* fetchProducts({ payload }) {
  try {
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    console.log("deleting");
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* editProduct({ payload }) {
  try {
    yield handleEditProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onEditProductStart() {
  yield takeLatest(productsTypes.EDIT_PRODUCT_START, editProduct);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* fetchBestSellers() {
  try {
    const bestSellers = yield handleFetchBestSellers();
    yield put(setBestSellers(bestSellers));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchBestSellers() {
  yield takeLatest(productsTypes.FETCH_BEST_SELLERS, fetchBestSellers);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onEditProductStart),
    call(onFetchProductStart),
    call(onFetchBestSellers),
  ]);
}
