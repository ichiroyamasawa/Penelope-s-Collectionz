import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductStart,
  setProduct,
} from "./../../Redux/Products/products.actions";
import "./styles.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import ButtonColor from "./../Forms/ButtonColor";
import HR from "./../HR";

const mapState = (state) => ({
  product: state.productsData.product,
});

const OrderForm = ({}) => {
  const dispatch = useDispatch();
  const { Prod_Code } = useParams();
  const { product } = useSelector(mapState);

  const {
    Prod_Name,
    Prod_Image,
    Prod_Size,
    Prod_Color,
    Prod_Price,
    Prod_Description,
  } = product;

  const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState(0);

  const add = () => {
    setCounter(counter + 1);
  };

  const sub = () => {
    setCounter(counter - 1);
    if (counter <= 0) {
      setCounter(0);
    }
  };

  useEffect(() => {
    if (Prod_Price) {
      setTotal((Prod_Price * counter).toFixed(2));
    }

    console.log(total, 1);
  }, [counter]);

  useEffect(() => {
    dispatch(fetchProductStart(Prod_Code));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="orderForm">
      <h1 className="productName">{Prod_Name}</h1>
      <Container fluid className="p-0">
        <Row className="p-0 mb-5">
          <Col className="productImageContainer text-center">
            <img className="productImage" src={Prod_Image} alt={Prod_Name} />
          </Col>
          <Col>
            <Container>
              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">
                    Price: &#8369; {Prod_Price}
                  </div>
                </Col>
              </Row>

              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">Color:</div>
                </Col>
                {/* map color */}
                <Col md="auto">
                  <ButtonColor name="color" id="{Prod_Color}" color="red" />
                </Col>
                <Col md="auto">
                  <ButtonColor
                    name="color"
                    id={Prod_Color}
                    color={Prod_Color}
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">Size:</div>
                </Col>
                {/* map size */}
                <Col md="auto">
                  <Form.Check
                    className="productSize"
                    style={{ fontSize: 25 }}
                    inline
                    type="radio"
                    label={Prod_Size}
                    name="productSizes"
                    id={Prod_Size}
                  />
                  <Form.Check
                    style={{ fontSize: 25 }}
                    inline
                    type="radio"
                    label="Size 2"
                    name="productSizes"
                    id="Size 2"
                  />
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md="auto">
                  <div className="productLabels">Quantity:</div>
                </Col>
                <Col>
                  <div className="counter">
                    <Container className="p-0 counterWrapper">
                      <Row className="align-items-center">
                        <Col>
                          <Button onClick={sub} className="subBtn shadow-none">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                          </Button>
                        </Col>
                        <Col>
                          <h2 class="counterNum">{counter}</h2>
                        </Col>
                        <Col>
                          <Button onClick={add} className="addBtn shadow-none">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="productTotalPrice">
                    TOTAL: &#8369; {total}
                  </div>
                </Col>
              </Row>
              <Row className="text-center">
                <Col>
                  <Button className="orderBtns buyBtn">
                    {" "}
                    <i class="fa fa-shopping-bag" aria-hidden="true"></i> Buy
                    Now
                  </Button>
                </Col>
                <Col>
                  <Button
                    className="orderBtns addToBtn"
                    {...configAddToCartBtn}
                  >
                    {" "}
                    <i class=" fas fa-shopping-cart    "></i> Add to Cart
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <HR />
        </Row>
        <Row>
          <Col>
            <div className="productDescWrapper">
              <h1 className="productDesc">About this product: </h1>
              <span dangerouslySetInnerHTML={{ __html: Prod_Description }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderForm;
