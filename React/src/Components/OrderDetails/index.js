import React, { useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form } from "react-bootstrap";

import OrderSummary from "./../CheckoutForm/OrderSummary";
import { setOrderDetails } from "./../../Redux/Orders/orders.actions";

import "./styles.css";

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const {
    orderUserEmail,
    orderUserFirstName,
    orderUserLastName,
    orderUserContactNum,
    paymentMethod,
    orderUserBillingAddress,
    orderItems,
  } = order;
  //   const orderItems = order && order.orderItems;
  //   const orderUserBillingAddress = order && order.orderUserBillingAddress;

  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, []);

  useEffect(() => {
    if (paymentMethod) {
      paymentMethodSwitch(paymentMethod);
      refNumSwitch(paymentMethod);
    }
  }, [paymentMethod]);

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

  const [paymentMethodImg, setPaymentMethodImg] = useState("");
  const [refNum, setRefNum] = useState("");

  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <div>
        <Container fluid>
          <Row>
            <Col md={{ span: 6, offset: 1 }}>
              <div className="orderDetailsLeft">
                <h2 className="checkout-subTitle">
                  <i class="fa fa-user" aria-hidden="true"></i>
                  Billing Information
                </h2>

                {orderUserFirstName && (
                  <div>
                    <Form.Group as={Row} controlId="custName">
                      <Form.Label column sm="2">
                        Name:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          className="checkoutInput"
                          //   plaintext
                          readOnly
                          defaultValue={
                            orderUserFirstName + " " + orderUserLastName
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="custName">
                      <Form.Label column sm="2">
                        Email:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          className="checkoutInput"
                          //   plaintext
                          readOnly
                          defaultValue={orderUserEmail}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="custAddress">
                      <Form.Label column sm="2">
                        Address:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          className="checkoutInput"
                          //   plaintext
                          readOnly
                          defaultValue={
                            orderUserBillingAddress.houseNo +
                            " " +
                            orderUserBillingAddress.street +
                            " " +
                            orderUserBillingAddress.brgy +
                            " " +
                            orderUserBillingAddress.city
                          }
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="contactNo">
                      <Form.Label column sm="2">
                        Contact #:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          className="checkoutInput"
                          //   plaintext
                          readOnly
                          defaultValue={orderUserContactNum}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                )}
              </div>
            </Col>
            <Col md={4}>
              <div className="orderDetailsRight">
                <h2 className="checkout-subTitle">
                  <i class="fa fa-credit-card" aria-hidden="true"></i> Payment
                  Method
                </h2>
                <Row className="align-items-center ">
                  <Col md="auto">
                    <img
                      className="orderDetailsPaymentMethodImg"
                      src={paymentMethodImg}
                      alt={paymentMethod}
                    />
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col className="orderPaymentMethodDetails">
                          <h4>
                            Account Name:
                            <br /> <strong>JEAN JHEN ACE B. FERRER</strong>
                          </h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="orderPaymentMethodDetails">
                          <h4>
                            Ref. No.: <br /> <strong>{refNum}</strong>
                          </h4>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={{ offset: 1, span: 10 }}>
              <div className="orderDetails">
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
                            {Array.isArray(orderItems) &&
                              orderItems.length > 0 &&
                              orderItems.map((item, index) => {
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
        </Container>
      </div>
    </Suspense>
  );
};

export default OrderDetails;
