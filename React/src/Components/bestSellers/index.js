import React, { useEffect, useS } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchBestSellers } from "./../../Redux/Products/products.actions";

const mapState = ({ productsData }) => ({
  bestSellers: productsData.bestSellers,
});

const BestSellers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { bestSellers } = useSelector(mapState);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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

  useEffect(() => {
    dispatch(fetchBestSellers());
  }, []);

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
      {/* {Array.isArray(bestSellers) && bestSellers.length > 0
        ? bestSellers.map((item, index) => {
            return (
              <div className="bestSellerImgWrapper" key={index}>
                <img
                  className="bestSellerImg"
                  src={item.Prod_Image}
                  alt={item.Prod_Name}
                />
              </div>
            );
          })
        : {}} */}

      {Array.isArray(bestSellers) &&
        bestSellers.length > 0 &&
        bestSellers.slice(0, 4).map((item, index) => {
          return (
            <div className="bestSellerImgWrapper" key={index}>
              <img
                className="bestSellerImg"
                src={item.Prod_Image[0].image}
                alt={item.Prod_Name}
                onClick={() => {
                  history.push(`./product/${item.Prod_Code}`);
                }}
              />
            </div>
          );
        })}
    </Carousel>
  );
};

export default BestSellers;
