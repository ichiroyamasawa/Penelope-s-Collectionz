import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import HR from "./../../Components/HR";
import logo from "./../../Assets/PC-logo1-5.png";
import moment from "moment";

const Receipt = ({ orders }) => {
  const {
    orderItems,
    orderTotal,
    orderUserBillingAddress,
    orderUserContactNum,
    orderUserFirstName,
    orderUserLastName,
    paymentMethod,
    orderID,
  } = orders;
  const date = orders.orderCreatedDate.toDate();
  return (
    <div id="receipt">
      <div class="zig-zag-bottom zig-zag-top">
        <hr className="receiptDashedHR" />
        <br />
        <img className="receiptLogo" src={logo} alt="Penelope's Collectionz" />
        <p>
          <i class="fa fa-phone" aria-hidden="true"></i> Contact Number: 0997
          063 2962
        </p>
        <p>
          <i class="fa fa-envelope" aria-hidden="true"></i> Email:{" "}
          <a
            href="mailto:penelopescollectionz@gmail.com"
            className="contactUsEmail"
          >
            penelopescollectionz@gmail.com
          </a>
        </p>

        <div className="receiptHR">
          <HR />
          <br />
          <Row>
            <Col>
              <strong>Billing Details</strong>
            </Col>
          </Row>
          <Row className="text-left">
            <Col>
              <strong>Date:</strong> {moment(date).format("MM/DD/YYYY")}
            </Col>
          </Row>
          <Row className="text-left">
            <Col>
              <strong>OrderID:</strong>&nbsp;{orderID}
            </Col>
          </Row>
          <Row className="text-left">
            <Col>
              <strong>Name:</strong>&nbsp;
              {orderUserFirstName + " " + orderUserLastName}
            </Col>
          </Row>
          <Row className="text-left">
            <Col>
              <strong>Address:</strong>&nbsp;
              {orderUserBillingAddress.houseNo +
                " " +
                orderUserBillingAddress.street +
                " " +
                orderUserBillingAddress.brgy +
                " " +
                orderUserBillingAddress.city}
            </Col>
          </Row>
          <Row className="text-left">
            <Col>
              <strong>Contact#:</strong>&nbsp;{orderUserContactNum}
            </Col>
          </Row>
          <Row className="text-left">
            <Col>
              <strong>Paid&nbsp;via&nbsp;{paymentMethod}</strong>
            </Col>
          </Row>
          <br />
          <HR />
          <br />
          {Array.isArray(orderItems) &&
            orderItems.length > 0 &&
            orderItems.map((item, index) => {
              return (
                <Row key={index}>
                  <Col className="text-left">
                    {item.product.Prod_Name.substring(0, 5).concat("...")}
                  </Col>
                  <Col md={3} xs={3} className="text-left">
                    {item.selectedColor}
                  </Col>
                  <Col></Col>
                  <Col className="text-left">x{item.quantity}</Col>

                  <Col className="text-right">
                    &#8369;{item.total.toFixed(2)}
                  </Col>
                </Row>
              );
            })}
          <br />
          <HR />
          <br />
          <Row>
            <Col className="text-right">
              <h4>
                <strong>TOTAL: &#8369;{orderTotal.toFixed(2)}</strong>
              </h4>
            </Col>
          </Row>
        </div>
        <hr className="receiptDashedHR" />
      </div>
    </div>
  );
};

export default Receipt;
