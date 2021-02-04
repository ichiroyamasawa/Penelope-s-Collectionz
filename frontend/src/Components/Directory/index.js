import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../Redux/Products/products.actions";
import Product from "./Product";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardDeck } from "react-bootstrap";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Directory = ({}) => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  if (!Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        <p>Product not found.</p>
      </div>
    );
  }
  return (
    <div className="products">
      <h1 className="products-sectionTitle">Our Products</h1>
      {products.map((product, pos) => {
        const { Prod_Image, Prod_Name, Prod_Price } = product;
        if (!Prod_Image || !Prod_Name || typeof Prod_Price === "undefined")
          return null;

        const configProduct = {
          Prod_Image,
          Prod_Name,
          Prod_Price,
        };

        return <Product {...configProduct} />;
      })}
    </div>
  );
};

export default Directory;
