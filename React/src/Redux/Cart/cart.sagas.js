import cartTypes from "./cart.types";
import { takeLatest, put, all, call, take } from "redux-saga/effects";
import { handleSaveCart, handleRetrieveCart } from "./cart.helpers";
import { setCart, addProduct } from "./cart.actions";

export function* saveCart({ payload }) {
  try {
    yield handleSaveCart(payload);
  } catch (err) {
    console.log(err);
  }
}

export function* onSaveCart() {
  yield takeLatest(cartTypes.SAVE_CART, saveCart);
}

export function* retrieveCart({ payload }) {
  try {
    const cartItems = yield handleRetrieveCart(payload);
    for (let i = 0; i < cartItems.length; i++) {
      yield put(addProduct(cartItems[i]));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onRetrieveCart() {
  yield takeLatest(cartTypes.RETRIEVE_CART, retrieveCart);
}

export default function* cartSagas() {
  yield all([call(onSaveCart), call(onRetrieveCart)]);
}
