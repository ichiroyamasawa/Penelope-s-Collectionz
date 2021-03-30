import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams, useHistory } from "react-router-dom";
import {
  getOrderDetailsStart,
  setOrderComplete,
} from "./../../Redux/Orders/orders.actions";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button, Modal } from "react-bootstrap";
import BtnPink from "./../../Components/Forms/ButtonPink";
import OrderDetails from "./../../Components/OrderDetails";

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

const CustomerOrderDetails = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;
  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, []);
  return (
    <div className="clientOrderDetails">
      <h1 className="clientOrderDetails-sectionTitle">Order</h1>
      <div className="orderDetailsOrderID">
        <h1 className="orderID">
          <i class="fas fa-receipt    "></i> Order ID# {orderID}
        </h1>
      </div>

      <OrderDetails order={orderDetails} />

      <div className="orderDetailsTotal">
        <h1 className="orderID">
          <i class="fas fa-money-bill-wave"></i> Total: &#8369;{" "}
          {parseFloat(orderTotal).toFixed(2)}
        </h1>
      </div>
      <Row className="text-center m-0 custBackBtn">
        <Col>
          <Button
            className="orderBtns buyBtn"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            {" "}
            <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerOrderDetails;
