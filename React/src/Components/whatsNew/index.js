import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "./styles.css";

//media
import promo1 from "./../../Assets/Banners/Promo1.jpg";
import promo2 from "./../../Assets/Banners/Promo2.jpg";
import promo3 from "./../../Assets/Banners/Promo3.jpg";

const WhatsNew = () => {
  return (
    <AwesomeSlider className="slider">
      <div className="whatsNewImg" data-src={promo1} />
      <div className="whatsNewImg" data-src={promo2} />
      <div className="whatsNewImg" data-src={promo3} />
    </AwesomeSlider>
  );
};

export default WhatsNew;
