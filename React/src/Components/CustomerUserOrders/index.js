import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../../Redux/Orders/orders.actions";
import "./styles.css";
import { useHistory } from "react-router-dom";
import CustomerUserOrdersHolder from "./CustomerUserOrdersHolder";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const ClientUserOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, orderHistory } = useSelector(mapState);
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);
  return (
    <div>
      <h1 className="custUserOrders-sectionTitle"> My Orders History</h1>
      <br />
      <Container fluid className="custOrderHistoryWrapper">
        {Array.isArray(orderHistory) && orderHistory.length > 0 ? (
          orderHistory.map((item, index) => {
            return (
              <Row>
                <Col md={{ span: 10, offset: 1 }} xs="auto">
                  <CustomerUserOrdersHolder
                    key={index}
                    orders={item}
                    handleClick={() => {
                      history.push(`/dashboard/orders/${item.orderID}`);
                    }}
                  />
                </Col>
              </Row>
            );
          })
        ) : (
          <h1 className="text-center mt-5">There are no orders yet.</h1>
        )}
      </Container>
    </div>
  );
};

export default ClientUserOrders;
