import React, { useState, useEffect } from "react";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import FormInput from "./../Forms/FormInput";
import BtnSec from "./../Forms/ButtonSecondary";
import BtnPink from "./../Forms/ButtonPink";
import ButtonImg from "./../Forms/ButtonImg";
import OrderSummary from "./OrderSummary";

import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from "./../../Redux/Cart/cart.selectors";
import { clearCart } from "./../../Redux/Cart/cart.actions";
import { saveOrderHistory } from "./../../Redux/Orders/orders.actions";
import { createStructuredSelector } from "reselect";

// Media Imports
import Success from "./../../Assets/checked.png";
import BPI from "./../../Assets/ModesOfPayment/bpi.png";
import BDO from "./../../Assets/ModesOfPayment/bdo.png";
import SecurityBank from "./../../Assets/ModesOfPayment/securitybank.png";
import GCash from "./../../Assets/ModesOfPayment/gcash.png";
import Paymaya from "./../../Assets/ModesOfPayment/paymaya.png";
import PalawanExpress from "./../../Assets/ModesOfPayment/palawan.png";
import CebuanaLhuillier from "./../../Assets/ModesOfPayment/cebuana.jpg";
import checkoutGIF from "./../../Assets/checkout.gif";
import { Switch } from "react-router-dom";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  cartItems: state.cartData.cartItems,
});

const totalState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  myCartItems: selectCartItems,
});

const initialAddressState = {
  houseNo: "",
  street: "",
  brgy: "",
  city: "",
};

// const cartState = (state) => ({
//   totalNumCartItems: selectCartItemsCount(state),
// });

const CheckoutForm = () => {
  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    if (paymentMethod == "") {
      handleShowEmpty();
    } else {
      handleShowConfirm();
    }
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, cartItems } = useSelector(mapState);
  const { total, itemCount, myCartItems } = useSelector(totalState);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [refNum, setRefNum] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethodImg, setPaymentMethodImg] = useState("");
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [showEmpty, setShowEmpty] = useState(false);
  const handleCloseEmpty = () => setShowEmpty(false);
  const handleShowEmpty = () => setShowEmpty(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };
  const handleShowConfirm = () => setShowConfirm(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };
  const handleShowSuccess = () => setShowSuccess(true);

  const submitOrder = () => {
    const configOrder = {
      orderTotal: total,
      orderItems: myCartItems,
      paymentMethod: paymentMethod,
      orderUserBillingAddress: billingAddress,
      orderUserFirstName: fName,
      orderUserLastName: lName,
      orderUserEmail: email,
      orderUserContactNum: contactNo,
      orderCompleted: false,
    };
    handleCloseConfirm();
    dispatch(saveOrderHistory(configOrder));
  };
  useEffect(() => {
    if (itemCount < 1) {
      handleShowSuccess();
    }
  }, [itemCount]);

  useEffect(() => {
    if (currentUser) {
      setFName(currentUser.fName);
      setLName(currentUser.lName);
      setContactNo(currentUser.contactNo);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  useEffect(() => {
    if (paymentMethod) {
      paymentMethodSwitch(paymentMethod);
      refNumSwitch(paymentMethod);
    }
  }, [paymentMethod]);

  const handleAddress = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const paymentMethodSwitch = (paymentMethod) => {
    switch (paymentMethod) {
      case "BDO":
        setPaymentMethodImg(
          "https://firebasestorage.googleapis.com/v0/b/penelope-s-collectionz.appspot.com/o/PaymentMethods%2Fbdo.png?alt=media&token=00badcd1-d58c-46f9-917d-510089b43006"
        );
        break;
      case "BPI":
        setPaymentMethodImg(
          "https://firebasestorage.googleapis.com/v0/b/penelope-s-collectionz.appspot.com/o/PaymentMethods%2Fbpi.png?alt=media&token=aca651b4-c014-4949-a2fa-7370d7f5e433"
        );
        break;
      case "CebuanaLhuillier":
        setPaymentMethodImg(
          "https://firebasestorage.googleapis.com/v0/b/penelope-s-collectionz.appspot.com/o/PaymentMethods%2Fcebuana.jpg?alt=media&token=c6b3f953-9ed5-4656-9f53-ba3ba50be2ed"
        );
        break;
      case "GCash":
        setPaymentMethodImg(
          "https://firebasestorage.googleapis.com/v0/b/penelope-s-collectionz.appspot.com/o/PaymentMethods%2Fgcash.png?alt=media&token=ce2ee48e-3cc9-4ac1-af14-0ea1f092ee87"
        );
        break;
      case "PalawanExpress":
        setPaymentMethodImg(
          "https://firebasestorage.googleapis.com/v0/b/penelope-s-collectionz.appspot.com/o/PaymentMethods%2Fpalawan.png?alt=media&token=85f31e5b-c824-4523-854d-d90c66831e98"
        );
        break;
      case "Paymaya":
        setPaymentMethodImg(
          "https://firebasestorage.googleapis.com/v0/b/penelope-s-collectionz.appspot.com/o/PaymentMethods%2Fpaymaya.png?alt=media&token=37ad399b-9865-47ce-9ff0-1f9e0abeace7"
        );
        break;
      case "SecurityBank":
        setPaymentMethodImg(
          "https://firebasestorage.googleapis.com/v0/b/penelope-s-collectionz.appspot.com/o/PaymentMethods%2Fsecuritybank.png?alt=media&token=d572e7e2-9e79-4874-a368-2791341ef4da"
        );
        break;

      default:
        break;
    }
  };

  const refNumSwitch = (refNum) => {
    switch (refNum) {
      case "BDO":
        setRefNum("001840932676");
        break;
      case "BPI":
        setRefNum("4669 1817 07");
        break;
      case "CebuanaLhuillier":
        setRefNum("09970632962");
        break;
      case "GCash":
        setRefNum("09970632962");
        break;
      case "PalawanExpress":
        setRefNum("09970632962");
        break;
      case "Paymaya":
        setRefNum("09970632962");
        break;
      case "SecurityBank":
        setRefNum("0000029752689");
        break;
      default:
        break;
    }
  };

  return (
    <div className="checkout">
      <h1 className="checkout-sectionTitle">Checkout</h1>
      <Container fluid>
        {currentUser && (
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col>
                <div className="checkoutFormLeft">
                  <h2 className="checkout-subTitle">
                    <i class="fa fa-user" aria-hidden="true"></i> Billing
                    Information
                  </h2>

                  <div>
                    <Form.Group as={Row} controlId="userFName">
                      <Form.Label column sm="4">
                        First Name:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="checkoutInput"
                          //   plaintext
                          readOnly
                          defaultValue={fName}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="userLName">
                      <Form.Label column sm="4">
                        Last Name:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="checkoutInput"
                          //   plaintext
                          readOnly
                          defaultValue={lName}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="userEmail">
                      <Form.Label column sm="4">
                        Email:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="checkoutInput"
                          //   plaintext
                          readOnly
                          defaultValue={email}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="contactNo">
                      <Form.Label column sm="4">
                        Contact #:
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          className="checkoutInput"
                          //   plaintext
                          readOnly
                          defaultValue={contactNo}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="checkoutFormRight">
                  <h2 className="checkout-subTitle">
                    <i class="fa fa-credit-card" aria-hidden="true"></i> Payment
                    Method
                  </h2>
                  <div className="photos-arrange">
                    <Col md="auto">
                      <div>
                        <ButtonImg
                          name="paymentMethod"
                          id="BDO"
                          value="BDO"
                          img={BDO}
                          handleChange={() => {
                            setPaymentMethod("BDO");
                          }}
                        />
                      </div>
                    </Col>
                    <Col md="auto">
                      <div>
                        <ButtonImg
                          name="paymentMethod"
                          id="BPI"
                          value="BPI"
                          img={BPI}
                          handleChange={() => setPaymentMethod("BPI")}
                        />
                      </div>
                    </Col>
                    <Col md="auto">
                      <div>
                        <ButtonImg
                          name="paymentMethod"
                          id="CebuanaLhuillier"
                          value="CebuanaLhuillier"
                          img={CebuanaLhuillier}
                          handleChange={() =>
                            setPaymentMethod("CebuanaLhuillier")
                          }
                        />
                      </div>
                    </Col>
                    <Col md="auto">
                      <div>
                        <ButtonImg
                          name="paymentMethod"
                          id="GCash"
                          value="GCash"
                          img={GCash}
                          handleChange={() => setPaymentMethod("GCash")}
                        />
                      </div>
                    </Col>
                    <Col md="auto">
                      <div>
                        <ButtonImg
                          name="paymentMethod"
                          id="PalawanExpress"
                          value="PalawanExpress"
                          img={PalawanExpress}
                          handleChange={() =>
                            setPaymentMethod("PalawanExpress")
                          }
                        />
                      </div>
                    </Col>
                    <Col md="auto">
                      <div>
                        <ButtonImg
                          name="paymentMethod"
                          id="Paymaya"
                          value="Paymaya"
                          img={Paymaya}
                          handleChange={() => setPaymentMethod("Paymaya")}
                        />
                      </div>
                    </Col>
                    <Col md="auto">
                      <div>
                        <ButtonImg
                          name="paymentMethod"
                          id="SecurityBank"
                          value="SecurityBank"
                          img={SecurityBank}
                          handleChange={() => setPaymentMethod("SecurityBank")}
                        />
                      </div>
                    </Col>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="checkoutFormLeft">
                  <h2 className="checkout-subTitle">
                    {" "}
                    <i class="fa fa-home" aria-hidden="true"></i> Exact Billing
                    Address
                  </h2>

                  <FormInput
                    label="Unit / House Number:"
                    type="text"
                    name="houseNo"
                    value={billingAddress.houseNo}
                    placeholder="1234 - A"
                    handleChange={(e) => handleAddress(e)}
                  />
                  <FormInput
                    label="Building, Street Name:"
                    type="text"
                    name="street"
                    value={billingAddress.street}
                    placeholder="Building, Street St."
                    handleChange={(e) => handleAddress(e)}
                  />
                  <FormInput
                    label="Barangay, District:"
                    type="text"
                    name="brgy"
                    value={billingAddress.brgy}
                    placeholder="Brgy. 123, Sampaloc"
                    handleChange={(e) => handleAddress(e)}
                  />
                  <FormInput
                    label="City:"
                    type="text"
                    name="city"
                    value={billingAddress.city}
                    placeholder="Manila City"
                    handleChange={(e) => handleAddress(e)}
                  />
                </div>
              </Col>
              <Col>
                <div className="checkoutFormRight">
                  <h2 className="checkout-subTitle">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i> Order
                    Summary
                  </h2>
                  <div className="orderSummaryWrapper">
                    <table border="0" cellPadding="0" cellSpacing="0">
                      <tbody>
                        <tr>
                          <table
                            className="orderSummaryHeader"
                            border="0"
                            cellPadding="0"
                            cellSpacing="0"
                          >
                            <tbody>
                              <tr>
                                <th>Item</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Color</th>
                                <th>Size</th>
                                <th>Qty.</th>
                                <th>Subtotal</th>
                              </tr>
                            </tbody>
                          </table>
                        </tr>

                        <tr>
                          <table
                            className="orderSummaryHolder"
                            border="0"
                            cellPadding="0"
                            cellSpacing="0"
                          >
                            <tbody>
                              {cartItems.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <OrderSummary
                                        Prod_Image={item.product.Prod_Image}
                                        Prod_Name={item.product.Prod_Name}
                                        Prod_Color={item.selectedColor}
                                        Prod_Size={item.selectedSize}
                                        Prod_Price={item.product.Prod_Price}
                                        Quantity={item.quantity}
                                        Subtotal={item.total}
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col>
                <div className="checkoutCancel">
                  <Link to="/cart">
                    <Button className="buyBtn modalBtns checkoutSubmit">
                      <i class="fa fa-times" aria-hidden="true"></i> Cancel
                    </Button>
                  </Link>
                </div>
              </Col>
              <Col>
                <div className="checkoutSubmit">
                  <Button
                    type="submit"
                    className="addToBtn modalBtns checkoutSubmit"
                  >
                    {" "}
                    <i class="fa fa-check" aria-hidden="true"></i> Confirm Order
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="checkoutFormRight">
                  <h3 className="checkout-subTitle">
                    <i class="fas fa-money-bill-wave"></i> Total Price:
                  </h3>
                  <h1 className="checkout-subTitle">
                    &#8369;{total.toFixed(2)}
                  </h1>
                </div>
              </Col>
            </Row>
          </Form>
        )}
        <Modal show={showConfirm} onHide={handleCloseConfirm}>
          <Modal.Header closeButton>
            <Modal.Title>Checkout Order Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Before submitting your order please review it thoroughly.</h5>
            <br />
            <h5>
              <strong>Name: </strong>
              {fName + " " + lName}
            </h5>
            <h5>
              <strong>Email:</strong> {email}
            </h5>
            <h5>
              <strong>Contact Number: </strong>
              {contactNo}
            </h5>
            <h5>
              <strong>Address: </strong>
              {billingAddress.houseNo +
                " " +
                billingAddress.street +
                " " +
                billingAddress.brgy +
                " " +
                billingAddress.city}
            </h5>
            <h5>
              <strong>Payment Method: </strong>
              {paymentMethod}
            </h5>
            <br />
            <h5>To pay for your order, please refer here:</h5>
            <div>
              <Row className="align-items-center ">
                <Col>
                  <img src={paymentMethodImg} alt={paymentMethod} />
                </Col>
                <Col>
                  <Container>
                    <Row>
                      <Col className="paymentMethodDetails">
                        <h4>
                          Account Name:
                          <br /> <strong>JEAN JHEN ACE B. FERRER</strong>
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="paymentMethodDetails">
                        <h4>
                          Ref. No.: <br /> <strong>{refNum}</strong>
                        </h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="paymentMethodDetails">
                        <h4>
                          Amount to Pay: <br />{" "}
                          <strong>&#8369;{total.toFixed(2)}</strong>
                        </h4>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          {/* <Modal.Body className="text-center">
            <img
              src={checkoutGIF}
              alt="ConfirmCheckout"
              className="checkoutGIF"
            />
          </Modal.Body> */}
          <Modal.Body className="text-center">
            <h3>NOTE: Strictly no cancellation of orders once confirmed. </h3>
            <br />
            <h3>
              <strong>Items are made to order.</strong>
            </h3>
          </Modal.Body>
          <Modal.Body>
            <Row className="text-center">
              <Col>
                <BtnPink onClick={submitOrder}>
                  I Understand & I am ready to submit my order.
                </BtnPink>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        <Modal show={showSuccess} onHide={handleCloseSuccess} backdrop="static">
          <Modal.Header>
            <Modal.Title>Order Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img className="successImg" src={Success} alt="Order Success!" />
            <h5>
              Yipee! Your order has been successfully submitted. Please keep in
              touch with us by chatting us here or in any of our social media
              accounts!
            </h5>
            <br />
            <h5>
              You can also check and review your billing details through the
              order history tab in your dashboard.
            </h5>
            <br />
            <h5>
              Please settle your billing and we will deliver the ordered items
              to you right away!.
            </h5>
            <br />
            <p>
              <em>
                NOTE: An <strong>E-Receipt</strong> will be sent to you through
                your dashboard once the billing has been settled and the order
                has been delivered successfully.
              </em>
            </p>
          </Modal.Body>
          <Modal.Body>
            <Row className="justify-content-center mb-2">
              <Col md={6}>
                <Button
                  block
                  className="profileSave"
                  onClick={() => {
                    history.push("/chat");
                    handleCloseSuccess();
                  }}
                >
                  <i class="fa fa-comments" aria-hidden="true"></i> Chat with
                  Penelope's Collectionz
                </Button>
              </Col>
            </Row>
            <Row className="justify-content-center mb-2">
              <Col md={6}>
                <Button
                  block
                  className="profileSave"
                  onClick={() => {
                    history.push("/contactUs");
                    handleCloseSuccess();
                  }}
                >
                  <i class="fa fa-facebook-square" aria-hidden="true"></i>{" "}
                  Social Media Accounts
                </Button>
              </Col>
            </Row>
            <Row className="justify-content-center mb-2">
              <Col md={6}>
                <Button
                  block
                  className="profileSave"
                  onClick={() => {
                    history.push("/dashboard");
                    handleCloseSuccess();
                  }}
                >
                  <i class="fa fa-user" aria-hidden="true"></i> Go to my
                  Dashboard
                </Button>
              </Col>
            </Row>
            <Row className="justify-content-center mb-2">
              <Col md={6}>
                <Button
                  block
                  className="profileSave"
                  onClick={() => {
                    history.push("/");
                    handleCloseSuccess();
                  }}
                >
                  <i class="fa fa-home" aria-hidden="true"></i> Homepage
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        <Modal show={showEmpty} onHide={handleCloseEmpty}>
          <Modal.Header closeButton>
            <Modal.Title>Oops!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            It looks like you forgot to select your desired{" "}
            <strong>Payment Method</strong>
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

export default CheckoutForm;
