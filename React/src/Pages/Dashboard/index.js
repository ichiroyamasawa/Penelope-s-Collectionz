import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "./../../Redux/Orders/orders.actions";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Tab, Nav } from "react-bootstrap";
import CustomerUserOrders from "./../../Components/CustomerUserOrders";
import Profile from "./../../Components/Profile";

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
      <Tab.Container id="left-tabs-example" defaultActiveKey="profilePage">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column dashboardNav">
              <Nav.Item>
                <Nav.Link eventKey="profilePage" className="dashboardNavLinks">
                  <i class="fa fa-user-circle"></i> Profile Page
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orderHistory" className="dashboardNavLinks">
                  <i class="fa fa-shopping-basket"></i> Order History
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="receipts" className="dashboardNavLinks">
                  <i class="fa fa-list-alt"></i> View Receipt
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="profilePage">
                <Profile />
              </Tab.Pane>
              <Tab.Pane eventKey="orderHistory">
                <CustomerUserOrders />
              </Tab.Pane>
              <Tab.Pane eventKey="receipts">
                <h1 className="receipt-sectionTitle">Receipts</h1>
                <br />
                <Container fluid>
                  <Row>
                    <Col
                      md={{ span: 10, offset: 1 }}
                      className="receiptWrapper p-0"
                    >
                      {Array.isArray(orderHistory) &&
                      orderHistory.length > 0 ? (
                        orderHistory.map((item, index) => {
                          {
                            if (item.orderCompleted === true)
                              return (
                                <div className="receiptHolder">
                                  <Row className="p-0 m-0">
                                    <Col className="receiptOrderIDHolder">
                                      <h3 className="receiptOrderID">
                                        OrderID: {item.orderID}
                                      </h3>
                                    </Col>
                                  </Row>
                                  <Row className="pt-5">
                                    <Col
                                      md={{ span: 4, offset: 4 }}
                                      key={index}
                                    >
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
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Dashboard;
