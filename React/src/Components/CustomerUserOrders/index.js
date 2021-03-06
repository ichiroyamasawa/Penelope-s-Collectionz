import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrderHistory } from "../../Redux/Orders/orders.actions";
import "./styles.css";
import { useHistory } from "react-router-dom";
import CustomerUserOrdersHolder from "./CustomerUserOrdersHolder";

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
      <h1 className="clientUserOrders-sectionTitle"> My Orders History</h1>
      <br />
      {Array.isArray(orderHistory) && orderHistory.length > 0 ? (
        orderHistory.map((item, index) => {
          return (
            <CustomerUserOrdersHolder
              key={index}
              orders={item}
              handleClick={() => {
                history.push(`/dashboard/orders/${item.orderID}`);
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
