import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addCartItem,
  reduceCartItem,
} from "./../../../Redux/Cart/cart.actions";
import "./styles.css";
import { Container, Row, Col, Media, Button } from "react-bootstrap";
import "./styles.css";
import { handleReduceCartItem } from "../../../Redux/Cart/cart.utils";

const CartItem = ({
  Image,
  Name,
  Color,
  Size,
  Price,
  Quantity,
  Subtotal,
  Prod_Code,
  itemKey,
}) => {
  const dispatch = useDispatch();
  const PriceN = Number(Price);
  const handleRemoveCartItem = (Prod_Code) => {
    console.log(Prod_Code);
    dispatch(removeCartItem(Prod_Code));
  };

  const handleReduceCartItem = (Prod_Code) => {
    dispatch(reduceCartItem(Prod_Code));
  };

  const handleAddCartItem = (Prod_Code) => {
    dispatch(addCartItem(Prod_Code));
  };

  return (
    <div className="cartItem">
      <Container>
        <Row className="align-items-center" key={itemKey}>
          <Col>
            <Media>
              <img src={Image} alt={Name} className="cartImage mr-3" />
              <Media.Body className="cartItemDetails">
                <Row>
                  <Col>
                    <h4 className="cartItemName">{Name}</h4>
                  </Col>
                </Row>
                {/* <!-- COLOR --> */}
                <Row className="align-items-center">
                  <Col md={3} xs={5}>
                    Color:
                  </Col>
                  <Col>{Color}</Col>
                </Row>
                {/* <!-- SIZE --> */}
                <Row className="align-items-center">
                  <Col md={3} xs={5}>
                    Size:
                  </Col>
                  <Col>{Size}</Col>
                </Row>
                {/* <!-- PRICE --> */}
                <Row className="align-items-center">
                  <Col md={3} xs={5}>
                    Price:
                  </Col>
                  <Col>&#8369; {Price}</Col>
                </Row>
                {/* <!-- QUANTITY --> */}
                <Row>
                  <Col md={3}>Quantity:</Col>
                  <Col xs="auto">
                    <span
                      className="cartQuanti"
                      onClick={() => {
                        handleReduceCartItem({
                          PriceN,
                          Prod_Code,
                          Color,
                          Size,
                          itemKey,
                        });
                      }}
                    >
                      <i class="fas fa-arrow-circle-left    "></i>
                    </span>
                    <span>&nbsp; {Quantity} &nbsp;</span>
                    <span
                      className="cartQuanti"
                      onClick={() => {
                        handleAddCartItem({
                          PriceN,
                          Prod_Code,
                          Color,
                          Size,
                          itemKey,
                        });
                      }}
                    >
                      <i
                        class="fa fa-arrow-circle-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
                {/* <!-- TOTAL --> */}
                <Row className="align-items-center">
                  <Col md={3}>
                    {" "}
                    <h5 className=" subtotal">Subtotal:</h5>
                  </Col>
                  <Col>
                    <h5 className=" subtotal">
                      &#8369; {parseFloat(Subtotal).toFixed(2)}
                    </h5>
                  </Col>
                </Row>
              </Media.Body>
            </Media>
          </Col>
          <Col md="auto" xs={12}>
            <Button
              variant="danger"
              className="m-0 delItm"
              onClick={() => {
                handleRemoveCartItem({ Prod_Code, Color, Size, itemKey });
              }}
            >
              <i class="fa fa-trash" aria-hidden="true"></i> Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartItem;
