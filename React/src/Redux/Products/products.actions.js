import productsTypes from "./products.types";

export const addProductStart = (productData) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters,
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProductStart = (Prod_Code) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: Prod_Code,
});

export const editProductStart = (products) => ({
  type: productsTypes.EDIT_PRODUCT_START,
  payload: products,
});
