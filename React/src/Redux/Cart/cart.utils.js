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
