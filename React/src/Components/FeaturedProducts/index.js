import React from "react";
import {Link} from 'react-router-dom'
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "./styles.css";

//media
import product1 from "./../../Assets/Banners/Product1.jpg";
import product2 from "./../../Assets/Banners/Product2.jpg";
import product3 from "./../../Assets/Banners/Product3.jpg";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const FeaturedProducts = () => {
  const prodClicked = () => {
    console.log("ProdClicked")
  }
  return (
    <AwesomeSlider className="slider">
       
      <div className="whatsNewImg" data-src={product1} onClick={() => window.location.href="/product/yZKvxLaSvlvy7JzP2rDL"}/>
      <div className="whatsNewImg" data-src={product2} onClick={() => window.location.href="/product/EEqjJ16eCs0bE6THOjlV"}/>
      <div className="whatsNewImg" data-src={product3} onClick={() => window.location.href="/product/mnjQbNMHrJW48fEGiP9R"}/>
    </AwesomeSlider>
  );
};

export default FeaturedProducts;
