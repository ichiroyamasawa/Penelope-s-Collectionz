import React from "react";
import "./styles.css";
import CustomerUserOrders from "./../../Components/CustomerUserOrders";

const Dashboard = ({}) => {
  return (
    <div>
      <h1>My Profile</h1>
      <h1>Orders</h1>
      <CustomerUserOrders />
      <h1>Receipts</h1>
    </div>
  );
};

export default Dashboard;
