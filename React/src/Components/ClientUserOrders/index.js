import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientOrderHistory } from "./../../Redux/Orders/orders.actions";
import "./styles.css";
import { useHistory } from "react-router-dom";
import ClientUserOrdersHolder from "./ClientUserOrdersHolder";
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
    dispatch(getClientOrderHistory(currentUser.id));
  }, []);
  return (
    <div>
      <h1 className="clientUserOrders-sectionTitle"> Orders History</h1>
      <br />
      <h3 className="ordersNote">
        <strong>NOTE:</strong> Completed orders are darker in color
      </h3>
      <Container fluid className="clientOrderHistoryWrapper">
        {Array.isArray(orderHistory) && orderHistory.length > 0 ? (
          orderHistory.map((item, index) => {
            return (
              <Row>
                <Col>
                  <ClientUserOrdersHolder
                    key={index}
                    orders={item}
                    handleClick={() => {
                      history.push(`/manageOrders/${item.orderID}`);
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
