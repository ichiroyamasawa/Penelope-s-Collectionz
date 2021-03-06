import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientOrderHistory } from "./../../Redux/Orders/orders.actions";
import "./styles.css";
import { useHistory } from "react-router-dom";
import ClientUserOrdersHolder from "./ClientUserOrdersHolder";

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
      {Array.isArray(orderHistory) && orderHistory.length > 0 ? (
        orderHistory.map((item, index) => {
          return (
            <ClientUserOrdersHolder
              key={index}
              orders={item}
              handleClick={() => {
                history.push(`/client/orders/${item.orderID}`);
              }}
            />
          );
        })
      ) : (
        <h1 className="text-center mt-5">There are no orders yet.</h1>
      )}
    </div>
  );
};

export default ClientUserOrders;
