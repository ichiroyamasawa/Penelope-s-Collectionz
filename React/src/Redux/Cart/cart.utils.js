export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    (cartItem) =>
      cartItem.product.Prod_Code === nextCartItem.product.Prod_Code &&
      cartItem.selectedColor === nextCartItem.selectedColor &&
      cartItem.selectedSize === nextCartItem.selectedSize
  );
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });

  if (cartItemExists) {
    return prevCartItems.map((cartItem) =>
      cartItem.product.Prod_Code == nextCartItem.product.Prod_Code &&
      cartItem.selectedColor == nextCartItem.selectedColor &&
      cartItem.selectedSize == nextCartItem.selectedSize
        ? {
            ...cartItem,
            quantity: cartItem.quantity + nextCartItem.quantity,
            total: cartItem.total + nextCartItem.total,
          }
        : cartItem
    );
  }

  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      //   quantity: quantityIncrement,
    },
  ];
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  return prevCartItems.filter(
    (item, index) => index !== cartItemToRemove.itemKey
  );
};

export const handleAddCartItem = ({ prevCartItems, cartItemToAdd }) => {
  return prevCartItems.map((cartItem) =>
    cartItem.product.Prod_Code === cartItemToAdd.Prod_Code &&
    cartItem.selectedSize === cartItemToAdd.Size &&
    cartItem.selectedColor === cartItemToAdd.Color
      ? {
          ...cartItem,
          quantity: cartItem.quantity + 1,
          total: cartItem.total + cartItemToAdd.PriceN,
        }
      : cartItem
  );
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  const existingCartItem = prevCartItems.find(
    (cartItem) =>
      cartItem.product.Prod_Code === cartItemToReduce.Prod_Code &&
      cartItem.selectedSize === cartItemToReduce.Size &&
      cartItem.selectedColor === cartItemToReduce.Color
  );
  console.log(existingCartItem);

  const existingCartItemIndex = prevCartItems.findIndex(
    (cartItem) =>
      cartItem.product.Prod_Code === cartItemToReduce.Prod_Code &&
      cartItem.selectedSize === cartItemToReduce.Size &&
      cartItem.selectedColor === cartItemToReduce.Color
  );
  console.log(existingCartItemIndex, 99);

  if (existingCartItem.quantity === 1) {
    const filtered = prevCartItems.filter(
      (cartItem, index) => index !== cartItemToReduce.itemKey
    );

    console.log(filtered);
    return filtered;
  }

  return prevCartItems.map((cartItem) =>
    cartItem.product.Prod_Code === cartItemToReduce.Prod_Code &&
    cartItem.selectedSize === cartItemToReduce.Size &&
    cartItem.selectedColor === cartItemToReduce.Color
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          total: cartItem.total - cartItemToReduce.PriceN,
        }
      : cartItem
  );
};
