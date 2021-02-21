import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import BtnPink from "./../../Forms/ButtonPink";
import "./styles.css";
import useFitText from "use-fit-text";

const Product = (product) => {
  const { Prod_Code, Prod_Image, Prod_Name, Prod_Price } = product;
  const { fontSize, ref } = useFitText({ maxFontSize: 200 });
  if (
    !Prod_Code ||
    !Prod_Image ||
    !Prod_Name ||
    typeof Prod_Price === "undefined"
  )
    return null;

  // const configAddToCart = {
  //   type: "button",
  // };

  return (
    <div className="product">
      <Link to={`/product/${Prod_Code}`}>
        <Card className="">
          <Card.Img className="prodImg" variant="top" src={Prod_Image} />
          <Card.Body>
            <Card.Title
              ref={ref}
              style={{ fontSize, height: 25, width: "100%" }}
              className="productDetails align-items-center"
            >
              {Prod_Name}
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem className="productDetails productPrice">
              &#8369; {Prod_Price}
            </ListGroupItem>
          </ListGroup>
          {/* <Card.Body>
            <div className="addToCart">
              <BtnPink {...configAddToCart}>
                <i className="fa fa-shopping-basket" aria-hidden="true"></i> Add
                To Cart
              </BtnPink>
            </div>
          </Card.Body> */}
        </Card>
      </Link>
    </div>
  );
};

export default Product;
