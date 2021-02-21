import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../Redux/Products/products.actions";
import { addProduct } from "./../../Redux/Cart/cart.actions";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import ButtonColor from "./../Forms/ButtonColor";
import HR from "./../HR";

import addToCartGIF from "./../../Assets/addToCart.gif";

const mapState = (state) => ({
  product: state.productsData.product,
  cart: state.cartData.cart,
});

const OrderForm = ({}) => {
  const dispatch = useDispatch();
  const { Prod_Code } = useParams();
  const { product } = useSelector(mapState);

  const {
    Prod_Name,
    Prod_Image,
    Prod_Size,
    Prod_Color,
    Prod_Price,
    Prod_Description,
  } = product;

  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const add = () => {
    setQuantity(quantity + 1);
  };

  const sub = () => {
    setQuantity(quantity - 1);
    if (quantity <= 0) {
      setQuantity(0);
    }
  };

  useEffect(() => {
    if (Prod_Price) {
      setTotal(Number(Prod_Price * quantity));
    }

    console.log(total, 1);
  }, [quantity]);

  useEffect(() => {
    dispatch(fetchProductStart(Prod_Code));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const configAddToCartBtn = {
    type: "button",
  };

  const configBuyNowBtn = {
    type: "button",
  };

  const handleAddToCartBtn = (product) => {
    if (!product) return;
    handleShow();
    dispatch(addProduct(product));
  };

  return (
    <div className="orderForm">
      <h1 className="productName">{Prod_Name}</h1>
      <Container fluid className="p-0">
        <Row className="p-0 mb-5">
          <Col className="productImageContainer text-center">
            <img className="productImage" src={Prod_Image} alt={Prod_Name} />
          </Col>
          <Col>
            <Container>
              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">
                    Price: &#8369; {Prod_Price}
                  </div>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">Color:</div>
                </Col>
                {/* map color */}
                <Col md="auto">
                  <ButtonColor name="color" id="{Prod_Color}" color="red" />
                </Col>
                <Col md="auto">
                  <ButtonColor
                    name="color"
                    id={Prod_Color}
                    color={Prod_Color}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">Size:</div>
                </Col>
                {/* map size */}
                <Col md="auto">
                  <Form.Check
                    className="productSize"
                    style={{ fontSize: 25 }}
                    inline
                    type="radio"
                    label={Prod_Size}
                    name="productSizes"
                    id={Prod_Size}
                  />
                  <Form.Check
                    style={{ fontSize: 25 }}
                    inline
                    type="radio"
                    label="Size 2"
                    name="productSizes"
                    id="Size 2"
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">Quantity:</div>
                </Col>
                <Col>
                  <div className="counter">
                    <Container className="p-0 counterWrapper">
                      <Row className="align-items-center">
                        <Col>
                          <Button onClick={sub} className="subBtn shadow-none">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                          </Button>
                        </Col>
                        <Col>
                          <h2 class="counterNum">{quantity}</h2>
                        </Col>
                        <Col>
                          <Button onClick={add} className="addBtn shadow-none">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="productTotalPrice">
                    TOTAL: &#8369; {total.toFixed(2)}
                  </div>
                </Col>
              </Row>
              <Row className="text-center">
                <Col>
                  <Button className="orderBtns buyBtn" {...configBuyNowBtn}>
                    {" "}
                    <i class="fa fa-shopping-bag" aria-hidden="true"></i> Buy
                    Now
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="orderBtns addToBtn"
                    {...configAddToCartBtn}
                    onClick={() =>
                      handleAddToCartBtn({ product, quantity, total })
                    }
                  >
                    {" "}
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> Add to
                    Cart
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <HR />
        </Row>
        <Row>
          <Col>
            <div className="productDescWrapper">
              <h1 className="productDesc">About this product: </h1>
              <span dangerouslySetInnerHTML={{ __html: Prod_Description }} />
            </div>
          </Col>
        </Row>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Yay! {Prod_Name} was successfully added to your cart!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={addToCartGIF} />
          </Modal.Body>
          <Modal.Body>
            <Row className="text-center">
              <Col>
                <Link to="/">
                  <Button className="buyBtn modalBtns" {...configBuyNowBtn}>
                    Continue Shopping
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button
                  className=" addToBtn modalBtns"
                  {...configAddToCartBtn}
                  onClick={() =>
                    handleAddToCartBtn({ product, quantity, total })
                  }
                >
                  {" "}
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i> View
                  your cart{" "}
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default OrderForm;
