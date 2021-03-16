import cartTypes from "./cart.types";

export const addProduct = (nextCartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nextCartItem,
});

export const removeCartItem = (cartItem) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem,
});

export const addCartItem = (cartItem) => ({
  type: cartTypes.ADD_CART_ITEM,
  payload: cartItem,
});

export const reduceCartItem = (cartItem) => ({
  type: cartTypes.REDUCE_CART_ITEM,
  payload: cartItem,
});

export const clearCart = () => ({
  type: cartTypes.CLEAR_CART,
});

export const saveCart = (cart) => ({
  type: cartTypes.SAVE_CART,
  payload: cart,
});

export const retrieveCart = (userID) => ({
  type: cartTypes.RETRIEVE_CART,
  payload: userID,
});

export const setCart = (cart) => ({
  type: cartTypes.SET_CART,
  payload: cart,
});
