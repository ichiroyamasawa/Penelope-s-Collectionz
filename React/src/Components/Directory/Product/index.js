import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import BtnPink from "./../../Forms/ButtonPink";
import "./styles.css";

const Product = ({ Prod_Image, Prod_Name, Prod_Price }) => {
  if (!Prod_Image || !Prod_Name || typeof Prod_Price === "undefined")
    return null;

  const configAddToCart = {
    type: "button",
  };

  return (
    <div className="product">
      <Card>
        <Card.Img className="prodImg" variant="top" src={Prod_Image} />
        <Card.Body>
          <Card.Title className="productDetails">{Prod_Name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="productDetails">
            &#8369; {Prod_Price}
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
          <div className="addToCart">
            <BtnPink {...configAddToCart}>
              <i className="fa fa-shopping-basket" aria-hidden="true"></i> Add
              To Cart
            </BtnPink>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
