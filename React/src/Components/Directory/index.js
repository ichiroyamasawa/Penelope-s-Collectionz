import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsStart } from "../../Redux/Products/products.actions";
import Product from "./Product";
import "./styles.css";
import { Link, useHistory, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Row,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  ButtonGroup,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import FormSelect from "./../Forms/FormSelect";
import AlertError from "./../AlertError";
import { PaginationNext } from "./../Pagination";
//import { PaginationBack, PaginationNext } from "./../Pagination";

import FeaturedProducts from "./../FeaturedProducts";
import BestSellers from "./../bestSellers";
import HR from "./../HR";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Directory = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);
  const [search, setSearch] = useState("");
  const { data, queryDoc, queryBeforeDoc, isLastPage, isFirstPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    console.log(nextFilter);
    if (nextFilter != "" || nextFilter != undefined) {
      const newFilter = "products_" + nextFilter;
      history.push(`/${newFilter}`);
    } else {
      history.push(`/${nextFilter}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProductsStart({ search }));
    setSearch("");
  };

  // const earringsFilters = {
  //   title: "Earrings",
  //   options: [
  //     {
  //       value: "earrings-drop",
  //       name: "Earrings - Drop",
  //     },
  //     {
  //       value: "earrings-hook",
  //       name: "Earrings - Hook",
  //     },
  //     {
  //       value: "earrings-stud",
  //       name: "Earrings - Stud",
  //     },
  //   ],
  //   handleSelect: handleFilter,
  // };

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show All",
        value: "",
      },
      {
        value: "earrings-drop",
        name: "Earrings - Drop",
      },
      {
        value: "earrings-hook",
        name: "Earrings - Hook",
      },
      {
        value: "earrings-stud",
        name: "Earrings - Stud",
      },

      {
        value: "hair-snapclips",
        name: "Hair Accessories - Snap Clips",
      },
      {
        value: "hair-turban",
        name: "Hair Accessories - Turban",
      },
      {
        value: "baby-beanie_diaper_set",
        name: "Baby - Beanie & Diaper Set",
      },
      {
        value: "home_personal-alcoholders",
        name: "Home & Personal Accessories - Alcoholders/Alcopouch",
      },
      {
        value: "home_personal-coasters",
        name: "Home & Personal Accessories - Coasters",
      },

      {
        value: "home_personal-penholder",
        name: "Home & Personal Accessories - Pen Holder",
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
          <FeaturedProducts />
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
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="dark"
              variant="dark"
              className="prodNavbar"
            >
              <Navbar.Brand className="products-subtitleProducts">
                <Link
                  to="/#prodSection"
                  style={{
                    textDecoration: "none",
                    color: "#8f4061",
                  }}
                  onClick={(e) => {
                    dispatch(fetchProductsStart({ search: "" }));
                  }}
                >
                  Products
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                style={{ color: "#8f4061" }}
              >
                <i class="fas fa-bars    "></i>
              </Navbar.Toggle>
              <Navbar.Collapse id="responsive-navbar-nav ">
                <Nav className="mr-auto text-center">
                  <Row>
                    <Col xs={12} md={"auto"}>
                      <NavDropdown
                        title="Earrings"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>
                          <Link
                            to="/products_earrings#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Show All Earrings
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link
                            to="/products_earrings-drop#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Drops
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_earrings-hook#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Hooks
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_earrings-stud#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Studs
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                    <Col xs={12} md={"auto"}>
                      <NavDropdown
                        title="Hair Accessories"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>
                          <Link
                            to="/products_hair#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Show All Hair Accessories
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link
                            to="/products_hair-snapclips#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Snap Clips
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_hair-turban#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Turbans
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                    <Col xs={12} md={"auto"}>
                      <NavDropdown
                        title="Baby Clothes"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>
                          <Link
                            to="/products_baby#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Show All Baby Clothes
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link
                            to="/products_baby-beanie_diaper_set#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Beanies & Diaper Sets
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                    <Col xs={12} md={"auto"}>
                      <NavDropdown
                        title="Home & Personal Accessories"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>
                          <Link
                            to="/products_home_personal#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Show All Home & Personal Accessories
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link
                            to="/products_home_personal-alcoholders#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Alcoholders / Alcopouches
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_home_personal-coasters#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Coasters
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_home_personal-penholder#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Pen Holders
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                  </Row>
                </Nav>
                <Nav>
                  <Link
                    to="/#prodSection"
                    style={{
                      textDecoration: "none",
                      color: "#8f4061",
                      paddingRight: "10px",
                    }}
                    onClick={(e) => {
                      dispatch(fetchProductsStart({ search: "" }));
                    }}
                  >
                    Show all Products
                  </Link>
                </Nav>
                <Form inline onSubmit={handleSearch}>
                  <FormControl
                    type="text"
                    name="search"
                    value={search}
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button type="submit" className="searchBtn mt-0">
                    Search
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
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
        <FeaturedProducts />
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
            <Navbar
              collapseOnSelect
              expand="lg"
              bg="dark"
              variant="dark"
              className="prodNavbar"
            >
              <Navbar.Brand className="products-subtitleProducts">
                <Link
                  to="/#prodSection"
                  style={{
                    textDecoration: "none",
                    color: "#8f4061",
                  }}
                  onClick={(e) => {
                    dispatch(fetchProductsStart({ search: "" }));
                  }}
                >
                  Products
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                style={{ color: "#8f4061" }}
              >
                <i class="fas fa-bars    "></i>
              </Navbar.Toggle>
              <Navbar.Collapse id="responsive-navbar-nav ">
                <Nav className="mr-auto text-center">
                  <Row>
                    <Col xs={12} md={"auto"}>
                      <NavDropdown
                        title="Earrings"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>
                          <Link
                            to="/products_earrings#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Show All Earrings
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link
                            to="/products_earrings-drop#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Drops
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_earrings-hook#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Hooks
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_earrings-stud#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Studs
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                    <Col xs={12} md={"auto"}>
                      <NavDropdown
                        title="Hair Accessories"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>
                          <Link
                            to="/products_hair#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Show All Hair Accessories
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link
                            to="/products_hair-snapclips#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Snap Clips
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_hair-turban#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Turbans
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                    <Col xs={12} md={"auto"}>
                      <NavDropdown
                        title="Baby Clothes"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>
                          <Link
                            to="/products_baby#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Show All Baby Clothes
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link
                            to="/products_baby-beanie_diaper_set#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Beanies & Diaper Sets
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                    <Col xs={12} md={"auto"}>
                      <NavDropdown
                        title="Home & Personal Accessories"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>
                          <Link
                            to="/products_home_personal#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Show All Home & Personal Accessories
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link
                            to="/products_home_personal-alcoholders#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Alcoholders / Alcopouches
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_home_personal-coasters#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Coasters
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                          <Link
                            to="/products_home_personal-penholder#prodSection"
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            Pen Holders
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Col>
                  </Row>
                </Nav>
                <Nav>
                  <Link
                    to="/#prodSection"
                    style={{
                      textDecoration: "none",
                      color: "#8f4061",
                      paddingRight: "10px",
                    }}
                    onClick={(e) => {
                      dispatch(fetchProductsStart({ search: "" }));
                    }}
                  >
                    Show all Products
                  </Link>
                </Nav>
                <Form inline onSubmit={handleSearch}>
                  <FormControl
                    type="text"
                    name="search"
                    value={search}
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button type="submit" className="searchBtn mt-0">
                    Search
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <ProductDropdown {...earringsFilters} />
          </Col>
        </Row> */}

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
