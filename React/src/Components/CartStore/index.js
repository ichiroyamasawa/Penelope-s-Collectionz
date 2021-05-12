import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Container, Row, Col, Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import { retrieveCart, saveCart } from "./../../Redux/Cart/cart.actions";
import "./styles.css";

const cartState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const mapState = (state) => ({
  totalNumCartItems: selectCartItemsCount(state),
  currentUser: state.user.currentUser,
});

const CartStore = () => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector(cartState);
  const { totalNumCartItems, currentUser } = useSelector(mapState);
  const [btnDisable, setBtnDisable] = useState(true);
  const [loadModal, setLoadModal] = useState(false);
  const handleCloseLoadModal = () => setLoadModal(false);
  const handleShowLoadModal = () => setLoadModal(true);
  const [saveModal, setSaveModal] = useState(false);
  const handleCloseSaveModal = () => setSaveModal(false);
  const handleShowSaveModal = () => setSaveModal(true);

  useEffect(() => {
    if (cartItems.length > 0) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [cartItems]);

  const loadPrevCart = () => {
    dispatch(retrieveCart(currentUser.id));
    handleCloseLoadModal();
  };

  const saveThisCart = () => {
    if (cartItems.length > 0) {
      const configCart = {
        cartItems: cartItems,
        userID: currentUser.id,
      };
      dispatch(saveCart(configCart));
      handleCloseSaveModal();
    }
  };

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
          <Col md={{ offset: 1, span: 6 }} xs={12}>
            <div className="cartItemWrapper">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  return (
                    <CartItem
                      itemKey={index}
                      Image={item.product.Prod_Image[0].image}
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
            <Container fluid>
              <Row className="justify-content-end cartSettingsHolder">
                <Col md="auto" xs="auto" className="p-0">
                <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Title as="h3">
                                Load previous cart
                              </Popover.Title>
                              <Popover.Content>
                                Click me to load your previous cart.
                              </Popover.Content>
                            </Popover>
                          }
                        >
                  <Button
                    className="buyBtn modalBtns cartSettings "
                    onClick={handleShowLoadModal}
                  >
                    <i class="fa fa-cloud-download" aria-hidden="true"></i>
                  </Button>
                  </OverlayTrigger>
                </Col>
                <Col md="auto" xs="auto">
                <OverlayTrigger
                          trigger={["hover", "focus"]}
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Title as="h3">
                                Save this cart
                              </Popover.Title>
                              <Popover.Content>
                                Click me to save your current cart.
                              </Popover.Content>
                            </Popover>
                          }
                        ><Button
                        className="addToBtn modalBtns cartSettings"
                        disabled={btnDisable}
                        onClick={() => {
                          handleShowSaveModal();
                        }}
                      >
                        {" "}
                        <i class="fas fa-save    "></i>
                      </Button></OverlayTrigger>
                  
                </Col>
              </Row>
              <Row>
                <Col>
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
                      <Col className="chckoutbtn">
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
          </Col>
        </Row>
      </Container>
      {/* Modals */}
      <Modal show={loadModal} onHide={handleCloseLoadModal} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Load Previous Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Did you save your cart the last time you visited us? We can help you
            to load your previously saved cart by clicking{" "}
            <strong>"Load Previous Cart"</strong> button below.
          </p>
          <p>
            {" "}
            Don't worry as your current cart is safe and won't be replaced.
            Instead, we'll just add the loaded cart to your current cart.
          </p>
          <p>
            NOTE: If you haven't saved a cart yet, we would not be able to load
            any saved cart.
          </p>
        </Modal.Body>
        <Modal.Body>
          <Row className="text-center">
            <Col>
              <Button
                className="buyBtn modalBtns"
                onClick={() => {
                  handleCloseLoadModal();
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                className="addToBtn modalBtns"
                onClick={() => loadPrevCart()}
              >
                <i class="fa fa-cloud-download" aria-hidden="true"></i> Load
                Previous Cart
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal show={saveModal} onHide={handleCloseSaveModal} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Save This Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Saving a cart would allow you to load it later if you decided to.
          </p>
          <p>
            Your saved cart can also serve as your express cart to add your
            favorite items from us in a jiffy!
          </p>
          <p>
            NOTE: Saving this cart will overwrite your previously saved cart if
            you have any.
          </p>
        </Modal.Body>
        <Modal.Body>
          <Row className="text-center">
            <Col>
              <Button
                className="buyBtn modalBtns"
                onClick={() => {
                  handleCloseSaveModal();
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                className="addToBtn modalBtns"
                onClick={() => saveThisCart()}
              >
                <i class="fas fa-save    "></i> Save This Cart
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartStore;
