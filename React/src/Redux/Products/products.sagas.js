import { takeLatest, put, all, call } from "redux-saga/effects";
import { setProducts, fetchProductsStart } from "./products.actions";
import productsTypes from "./products.types";
import productTypes from "./products.types";
import { auth } from "./../../Firebase/utils";
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleEditProduct,
} from "./products.helpers";

export function* addProduct({
  payload: {
    Prod_Category,
    Prod_Name,
    Prod_Color,
    Prod_Image,
    Prod_Price,
    Prod_Size,
    Prod_Stock,
    Prod_Description,
  },
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      Prod_Category,
      Prod_Name,
      Prod_Color,
      Prod_Image,
      Prod_Price,
      Prod_Size,
      Prod_Stock,
      Prod_Description,
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

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onEditProductStart),
  ]);
}
