import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../Redux/Products/products.actions";
import { addProduct } from "./../../Redux/Cart/cart.actions";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Modal,
  Carousel,
} from "react-bootstrap";
import ButtonColor from "./../Forms/ButtonColor";
import HR from "./../HR";

import addToCartGIF from "./../../Assets/addToCart.gif";
import BtnPink from "../Forms/ButtonPink";
import BtnCoral from "../Forms/ButtonCoral";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  product: state.productsData.product,
});

const OrderForm = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { Prod_Code } = useParams();
  const { product, currentUser } = useSelector(mapState);

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
  const [showEmpty, setShowEmpty] = useState(false);
  const [showConstraint, setShowConstraint] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(0);
  const [btnDisable, setBtnDisable] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEmpty = () => setShowEmpty(false);
  const handleShowEmpty = () => setShowEmpty(true);
  const handleCloseConstraint = () => setShowConstraint(false);
  const handleShowConstraint = () => setShowConstraint(true);

  const [carouselIdx, setCarouselIdx] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setCarouselIdx(selectedIndex);
  };
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

  useEffect(() => {
    if (!currentUser || !currentUser.emailVerified) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [currentUser]);

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

  const handleBuyNowBtn = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/checkout");
  };

  return (
    <div className="orderForm">
      <h1 className="productName">{Prod_Name}</h1>
      <Container fluid className="p-0">
        <Row className="p-0 mb-5 align-items-center">
          <Col className="productImageContainer text-center">
            {Prod_Image !== undefined && Prod_Image.length > 0 && (
              <Carousel
                activeIndex={carouselIdx}
                onSelect={handleSelect}
                controls={Prod_Image.length == 1 ? false : true}
              >
                {Prod_Image.map((img, index) => {
                  return (
                    <Carousel.Item>
                      <img
                        className="productImage"
                        src={Prod_Image !== undefined && img.image}
                        alt={Prod_Name}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            )}
          </Col>
          <Col>
            <Container>
              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">Price:</div>
                </Col>
                <Col>
                  <div className="productLabels"> &#8369; {Prod_Price}</div>
                </Col>
              </Row>

              <Row>
                <Col md="auto">
                  <div className="productLabels">Color:</div>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center orderFormSelect">
                {/* map color */}
                {Prod_Color &&
                  Prod_Color.map((colorVal, index) => {
                    const { color } = colorVal;
                    return (
                      <Col md="auto" xs="auto" key={index}>
                        <ButtonColor
                          name="color"
                          btnColor={color}
                          id={color}
                          handleChange={() => setSelectedColor(color)}
                        />
                      </Col>
                    );
                  })}
              </Row>
              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">Size:</div>
                </Col>

                {/* map size */}
              </Row>
              <Row className="d-flex justify-content-center orderFormSelect">
                {Prod_Size &&
                  Prod_Size.map((sizeVal, index) => {
                    const { size } = sizeVal;
                    return (
                      <Col md="auto" xs="auto" key={index}>
                        <Form.Check
                          className="productSize"
                          style={{ fontSize: 16 }}
                          inline
                          type="radio"
                          label={size}
                          name="size"
                          id={size}
                          onChange={() => setSelectedSize(size)}
                        />
                      </Col>
                    );
                  })}
              </Row>
              <Row className="align-items-center mt-5">
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
                  <Button
                    className="orderBtns buyBtn"
                    disabled={btnDisable}
                    {...configBuyNowBtn}
                    onClick={() => {
                      if (
                        selectedColor !== "" &&
                        selectedSize !== "" &&
                        quantity !== 0
                      ) {
                        handleBuyNowBtn({
                          product,
                          quantity,
                          total,
                          selectedColor,
                          selectedSize,
                        });
                      } else {
                        handleShowEmpty();
                      }
                    }}
                  >
                    {" "}
                    <i class="fa fa-shopping-bag" aria-hidden="true"></i> Buy
                    Now
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="orderBtns addToBtn"
                    {...configAddToCartBtn}
                    disabled={btnDisable}
                    onClick={() => {
                      if (
                        selectedColor !== "" &&
                        selectedSize !== "" &&
                        quantity !== 0
                      ) {
                        handleAddToCartBtn({
                          product,
                          quantity,
                          total,
                          selectedColor,
                          selectedSize,
                        });
                      } else {
                        handleShowEmpty();
                      }
                    }}
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
                <Link to="/cart">
                  <Button className="addToBtn modalBtns">
                    {" "}
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i> View
                    your cart{" "}
                  </Button>
                </Link>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        {/* Order Restraints  */}
        {currentUser ? (
          <>
            {!currentUser.emailVerified && (
              <>
                <Modal
                  show={showConstraint}
                  onHide={handleCloseConstraint}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Oops! Before you order...</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {" "}
                    Please make sure that you have your{" "}
                    <strong>email verified</strong> first by clicking the
                    caution icon {"("}
                    <span className="cautionConstraints">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                    {")"} in your header above.
                  </Modal.Body>
                  <Modal.Footer>
                    <BtnPink onClick={handleCloseConstraint}>Close</BtnPink>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </>
        ) : (
          <>
            <Modal
              show={showConstraint}
              onHide={handleCloseConstraint}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Oops! Before you order...</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                {" "}
                Please make sure that you are{" "}
                <strong>registered and logged in</strong> first.
              </Modal.Body>
              <Modal.Body>
                <Row className="text-center">
                  <Col>
                    <Link to="/registration">
                      <Button className="buyBtn modalBtns"> Register</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/login">
                      <Button
                        className="addToBtn modalBtns"
                        {...configBuyNowBtn}
                      >
                        Login
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
          </>
        )}
        <Modal show={showEmpty} onHide={handleCloseEmpty}>
          <Modal.Header closeButton>
            <Modal.Title>Oops!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            It looks like you forgot to select your desired{" "}
            <strong>Color</strong>, <strong>Size</strong>, and{" "}
            <strong>Quantity</strong>
          </Modal.Body>
          <Modal.Body>
            <Row className="text-center">
              <Col>
                <BtnPink onClick={handleCloseEmpty}>Close</BtnPink>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default OrderForm;
