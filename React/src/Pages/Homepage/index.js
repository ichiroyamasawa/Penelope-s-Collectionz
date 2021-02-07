import React from "react";
import "./styles.css";

//local import
import Directory from "../../Components/Directory";
import Sidebar from "./../../Components/Sidebar";

const Homepage = (props) => {
  return (
    <section className="main">
      <Sidebar />
      <Directory />
    </section>
  );
};

export default Homepage;
