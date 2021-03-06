import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import "./styles.css";

const CustomerUserOrdersHolder = ({ index, orders, handleClick }) => {
  const { orderID, orderTotal, orderCompleted } = orders;
  const date = orders.orderCreatedDate.toDate();
  return (
    <div
      key={index}
      className="clientUserOrdersHolder"
      onClick={handleClick}
      // style={orderCompleted ? { filter: "brightness(60%)" } : {}}
    >
      <Container>
        <Row className="align-self-center">
          <Col>
            <h5>Order Date:</h5>
          </Col>
          <Col>
            <h5>Order ID:</h5>
          </Col>
          <Col>
            <h5>Total Amount:</h5>
          </Col>
        </Row>
        <Row className="clientUserOrdersHolderDetails">
          <Col>
            <h4>{moment(date).format("MM/DD/YYYY, h:mm:ss a")}</h4>
          </Col>
          <Col>
            <h4>{orderID}</h4>
          </Col>
          <Col>
            <h4>&#8369; {orderTotal.toFixed(2)}</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerUserOrdersHolder;
