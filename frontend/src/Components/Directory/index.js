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
import Pagination from "./../Pagination";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Directory = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    if (nextFilter != "") {
      const newFilter = "products_" + nextFilter;
      history.push(`/${newFilter}`);
    } else {
      history.push(`/${nextFilter}`);
    }
  };

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
        name: "Hairclips",
        value: "hairclips",
      },
      {
        name: "Category 3",
        value: "category3",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data, //infinite Scroll
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
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

      {data.map((product, pos) => {
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
      {!isLastPage && <Pagination {...configLoadMore} />}
    </div>
  );
};

export default Directory;
