import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../Redux/Products/products.actions";
import Product from "./Product";
import "./styles.css";
import { useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import FormSelect from "./../Forms/FormSelect";
import AlertError from "./../AlertError";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Directory = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/${nextFilter}`);
  };

  if (!Array.isArray(products)) return null;

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show All",
        value: "",
      },
      {
        name: "Earrings",
        value: "earrings",
      },
      {
        name: "Category 2",
        value: "category2",
      },
      {
        name: "Category 3",
        value: "category3",
      },
    ],
    handleChange: handleFilter,
  };

  if (products.length < 1) {
    return (
      <div className="products">
        <h1 className="products-sectionTitle">Our Products</h1>

        <Row>
          <Col>
            <h2 className="products-subtitle">Products</h2>
          </Col>
          <Col className="searchFilters text-right">
            <ul>
              <li>Shop by Category:</li>
              <li>
                <FormSelect {...configFilters} />
              </li>
            </ul>
          </Col>
        </Row>
        <AlertError
          error={[
            "We cannot find that product. ",
            <i class="fas fa-sad-tear    "></i>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="products">
      <h1 className="products-sectionTitle">Our Products</h1>

      <Row>
        <Col>
          <h2 className="products-subtitle">Products</h2>
        </Col>
        <Col className="searchFilters text-right">
          <ul>
            <li>Shop by Category:</li>
            <li>
              <FormSelect {...configFilters} />
            </li>
          </ul>
        </Col>
      </Row>

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
