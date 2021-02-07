import React, { useState, useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import "./styles.css";
import BtnSideNav from "./../Forms/ButtonSideNav";
import { HashLink as Link } from "react-router-hash-link";

const Sidebar = (props) => {
  return (
    <Menu>
      <a id="whatsNew" className="menu-item" href="#whatsNewSection">
        <i class="fa fa-heart" aria-hidden="true"></i> What's New?
      </a>
      <a id="bestSellers" className="menu-item" href="#bestSellersSection">
        <i class="fa fa-star" aria-hidden="true"></i> Best Sellers
      </a>
      <a id="hotDeals" className="menu-item" href="#hotDealsSection">
        <i class="fa fa-fire" aria-hidden="true"></i> Hot Deals
      </a>
      <Link to="/products_earrings#prodSection">
        <BtnSideNav>Earrings</BtnSideNav>
      </Link>
      <Link to="/products_hairclips#prodSection">
        <BtnSideNav>Hairclips</BtnSideNav>
      </Link>
      <Link to="/products_category3#prodSection">
        <BtnSideNav>Category 3</BtnSideNav>
      </Link>
    </Menu>
  );
};

export default Sidebar;
