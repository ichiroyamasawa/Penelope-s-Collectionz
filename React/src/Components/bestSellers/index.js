import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";

import prod1 from "./../../Assets/Products/Sample1.jpg";

const BestSellers = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
      autoPlay={true}
      autoPlaySpeed={3000}
      responsive={responsive}
      className="bestSeller"
    >
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
      <div>
        <img className="bestSellerImg" src={prod1} />
      </div>
    </Carousel>
  );
};

export default BestSellers;
