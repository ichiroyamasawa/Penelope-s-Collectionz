import ordersTypes from "./orders.types";
import { takeLatest, put, all, call, take } from "redux-saga/effects";
import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrder,
  updateSale,
  updateStock,
  handleOrderComplete,
  handleGetClientOrderHistory,
} from "./orders.helpers";
import {
  setUserOrderHistory,
  setClientOrderHistory,
  setOrderDetails,
} from "./orders.actions";
import { auth } from "./../../Firebase/utils";
import { clearCart } from "./../Cart/cart.actions";

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* getClientOrderHistory({ payload }) {
  try {
    const history = yield handleGetClientOrderHistory(payload);
    yield put(setClientOrderHistory(history));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetClientOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_CLIENT_ORDER_HISTORY_START,
    getClientOrderHistory
  );
}

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });

    for (let index = 0; index < payload.orderItems.length; index++) {
      const element = payload.orderItems[index];
      yield updateSale(element);
      console.log(
        "order " + [index],
        element.product.Prod_Code,
        element.quantity
      );
      yield updateStock(element);
    }

    yield put(clearCart());
  } catch (err) {
    console.log(err);
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);

    yield put(setOrderDetails(order));
  } catch (err) {
    console.log(err);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export function* orderComplete({ payload }) {
  try {
    console.log(payload);
    yield handleOrderComplete(payload);
  } catch (err) {
    console.log(err);
  }
}

export function* onSetOrderComplete() {
  yield takeLatest(ordersTypes.SET_ORDER_COMPLETE, orderComplete);
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetClientOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onSetOrderComplete),
  ]);
}
