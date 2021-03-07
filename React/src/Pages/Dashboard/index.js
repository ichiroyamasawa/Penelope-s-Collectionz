import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "./../../Redux/Orders/orders.actions";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import CustomerUserOrders from "./../../Components/CustomerUserOrders";

import Receipt from "./../../Components/Receipt";
const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const Dashboard = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const { currentUser, orderHistory } = useSelector(mapState);
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);
  return (
    <div className="dashboard">
      <h1>My Profile</h1>
      <h1>Orders</h1>
      <CustomerUserOrders />
      <h1 className="receipt-sectionTitle">Receipts</h1>

      <Container fluid>
        <Row>
          <Col md={{ span: 10, offset: 1 }} className="receiptWrapper">
            {Array.isArray(orderHistory) && orderHistory.length > 0 ? (
              orderHistory.map((item, index) => {
                {
                  if (item.orderCompleted === true)
                    return (
                      <div className="receiptHolder">
                        <Row>
                          <Col md={{ span: 4, offset: 4 }} key={index}>
                            <Receipt orders={item} />
                          </Col>
                        </Row>
                      </div>
                    );
                }
              })
            ) : (
              <h1 className="text-center mt-5">
                There are no completed orders yet.
              </h1>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
