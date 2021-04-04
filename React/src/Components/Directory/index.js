import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../Redux/Products/products.actions";
import Product from "./Product";
import "./styles.css";
import { useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import FormSelect from "./../Forms/FormSelect";
import AlertError from "./../AlertError";
import { PaginationNext } from "./../Pagination";
//import { PaginationBack, PaginationNext } from "./../Pagination";

import WhatsNew from "./../whatsNew";
import BestSellers from "./../bestSellers";
import HotDeals from "./../hotDeals";
import HR from "./../HR";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Directory = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);

  const { data, queryDoc, queryBeforeDoc, isLastPage, isFirstPage } = products;

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
      // {
      //   name: "Category 3",
      //   value: "category3",
      // },
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

  // const handleLoadLess = () => {
  //   dispatch(
  //     fetchProductsStart({
  //       filterType,
  //       startBeforeDoc: queryBeforeDoc,
  //     })
  //   );
  // };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  // const configLoadLess = {
  //   onLoadBackEvt: handleLoadLess,
  // };

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <h1 className="products-sectionTitle">Our Products</h1>

        <div id="whatsNewSection">
          <h2 className="products-subtitle">Featured Products</h2>
          <WhatsNew />
        </div>

        <HR />

        <div id="bestSellersSection">
          <h2 className="products-subtitle">Best Sellers</h2>
          <BestSellers />
        </div>

        {/* <HR /> */}

        {/* <div id="hotDealsSection">
          <h2 className="products-subtitle">Hot Deals</h2>
          <HotDeals />
        </div> */}

        <HR />

        <Row className="emptyProd">
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
            "We cannot find product for this category. ",
            <i class="fas fa-sad-tear    "></i>,
          ]}
        />
      </div>
    );
  }

  return (
    <div className="products">
      <h1 className="products-sectionTitle">Our Products</h1>

      <div id="whatsNewSection">
        <h2 className="products-subtitle">Featured Products</h2>
        <WhatsNew />
      </div>

      <HR />

      <div id="bestSellersSection">
        <h2 className="products-subtitle">Best Sellers</h2>
        <BestSellers />
      </div>

      {/* <HR /> */}

      {/* <div id="hotDealsSection">
        <h2 className="products-subtitle">Hot Deals</h2>
        <HotDeals />
      </div> */}

      <HR />

      <div id="prodSection">
        <Row>
          <Col>
            <h2 className="products-subtitle">Products</h2>
          </Col>
          <Col className="searchFilters text-right ">
            <ul>
              <li>Shop by Category:</li>
              <li>
                <FormSelect {...configFilters} />
              </li>
            </ul>
          </Col>
        </Row>

        <div className="prds">
          {data.map((product, pos) => {
            const { Prod_Image, Prod_Name, Prod_Price } = product;
            if (!Prod_Image || !Prod_Name || typeof Prod_Price === "undefined")
              return null;

            const configProduct = {
              ...product,
            };

            return <Product {...configProduct} />;
          })}
        </div>
        <Row>
          {/* <Col>
            <PaginationBack {...configLoadLess} />
          </Col>
          <Col>
            <h1>{pageNum}</h1>
          </Col> */}
          <Col>{!isLastPage && <PaginationNext {...configLoadMore} />}</Col>
        </Row>
      </div>
    </div>
  );
};

export default Directory;
