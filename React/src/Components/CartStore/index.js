import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCartItemsCount,
  selectCartItems,
  selectCartTotal,
} from "./../../Redux/Cart/cart.selectors";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import BtnPink from "./../Forms/ButtonPink";
import BtnCoral from "./../Forms/ButtonCoral";
import CartItem from "./CartItem";
import HR from "./../HR";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./styles.css";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const cartState = (state) => ({
  totalNumCartItems: selectCartItemsCount(state),
});

const CartStore = () => {
  const { cartItems, total } = useSelector(mapState);
  const { totalNumCartItems } = useSelector(cartState);
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    if (cartItems.length > 0) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [cartItems]);

  return (
    <div className="cartStore">
      <h1 className="cart-sectionTitle">My Cart</h1>
      <Container fluid>
        <Row className="justify-content-center">
          <Col>
            <h3 className="cart-subtitle">
              Cart List {"("}
              {totalNumCartItems}
              {")"}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col md={{ offset: 1, span: 6 }} sm={12}>
            <div className="cartItemWrapper">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  return (
                    <CartItem
                      itemKey={index}
                      Image={item.product.Prod_Image}
                      Name={item.product.Prod_Name}
                      Color={item.selectedColor}
                      Size={item.selectedSize}
                      Price={item.product.Prod_Price}
                      Quantity={item.quantity}
                      Subtotal={item.total}
                      Prod_Code={item.product.Prod_Code}
                    />
                  );
                })
              ) : (
                <Row className="text-center align-items-center p-0 m-0">
                  <Col>
                    <h1>You have no items in your cart.</h1>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
          {/* <!-- CHECKOUT HTML --> */}
          <Col md={4}>
            <Container fluid className="checkoutSidebar">
              {/* <!--FINAL QUANTITY --> */}
              <Row>
                <Col md={6}>
                  <h4>No. of items ordered:</h4>
                </Col>
                <Col md="auto">
                  <h4>{totalNumCartItems}</h4>
                </Col>
              </Row>

              {/* <!--TOTAL PRICE --> */}
              <Row>
                <Col md={6}>
                  <h2 className="tPrice">Total Price:</h2>
                </Col>
                <Col md="auto">
                  <h2 className="tPrice">
                    &#8369; {parseFloat(total).toFixed(2)}
                  </h2>
                </Col>
              </Row>
              <HR />
              <Row className="text-center">
                <Col>
                  <Link to="/">
                    <Button className="buyBtn modalBtns">
                      Continue Shopping
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Link to="/checkout">
                    <Button
                      className="addToBtn modalBtns"
                      disabled={btnDisable}
                    >
                      {" "}
                      <i class="fas fa-clipboard-check    "></i> CHECKOUT
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartStore;
