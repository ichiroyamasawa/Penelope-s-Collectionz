import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";

import promo1 from "./../../Assets/Banners/Promo1.jpg";
import promo2 from "./../../Assets/Banners/Promo2.jpg";
import promo3 from "./../../Assets/Banners/Promo3.jpg";

const HotDeals = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      infinite={true}
      responsive={responsive}
      className="hotDeals"
    >
      <div className="hotDealsImgWrapper">
        <img className="hotDealsImg" src={promo1} />
      </div>
      <div className="hotDealsImgWrapper">
        <img className="hotDealsImg" src={promo2} />
      </div>
      <div className="hotDealsImgWrapper">
        <img className="hotDealsImg" src={promo3} />
      </div>
    </Carousel>
  );
};

export default HotDeals;
