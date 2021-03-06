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

const ClientOrderDetails = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, []);

  useEffect(() => {
    if (orderDetails.orderCompleted === true) {
      setDisabled(true);
    }
  }, [orderDetails]);

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
      <Row className="text-center  m-0">
        <Col>
          <Button
            className="orderBtns buyBtn"
            onClick={() => {
              history.push("/client/orders");
            }}
          >
            {" "}
            <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
          </Button>
        </Col>
        <Col>
          <Button
            className="orderBtns addToBtn"
            disabled={disabled}
            onClick={handleShowConfirm}
          >
            {" "}
            <i class="fa fa-check" aria-hidden="true"></i> Complete Order
          </Button>
        </Col>
      </Row>
      <Modal centered show={showConfirm} onHide={handleCloseConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Order Completion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>
            Completing this order will release the e-receipt of{" "}
            <strong>OrderID#{orderID} </strong>
            to the account of{" "}
            <strong>
              {orderDetails.orderUserFirstName +
                " " +
                orderDetails.orderUserLastName}{" "}
            </strong>
          </h5>
          <br />
          <h4>Complete this order?</h4>
        </Modal.Body>
        <Modal.Body>
          <Row className="text-center">
            <Col>
              <BtnPink
                onClick={() => {
                  handleCloseConfirm();
                  dispatch(setOrderComplete(orderID));
                  history.push("/client/orders");
                }}
              >
                Complete Order
              </BtnPink>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientOrderDetails;
