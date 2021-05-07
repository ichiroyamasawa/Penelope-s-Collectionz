import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import "./styles.css";
import BtnSideNav from "./../Forms/ButtonSideNav";
import { HashLink as Link } from "react-router-hash-link";
import { fetchProductsStart } from "../../Redux/Products/products.actions";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Accordion,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  return (
    <Menu>
      <a id="whatsNew" className="menu-item" href="#whatsNewSection">
        <i class="fa fa-heart" aria-hidden="true"></i> Featured Products
      </a>
      <a id="bestSellers" className="menu-item" href="#bestSellersSection">
        <i class="fa fa-star" aria-hidden="true"></i> Best Sellers
      </a>

      <Link
        className="menu-item"
        to="/#prodSection"
        onClick={(e) => {
          dispatch(fetchProductsStart({ search: "" }));
        }}
      >
        <i class="fa fa-shopping-bag" aria-hidden="true"></i> All Products
      </Link>
      {/* <a id="hotDeals" className="menu-item" href="#hotDealsSection">
        <i class="fa fa-fire" aria-hidden="true"></i> Hot Deals
      </a> */}
      <Accordion>
        <Card
          style={{
            margin: "0",
            marginTop: "10px",
            padding: "0",
            border: "none",
          }}
        >
          <Card.Header style={{ margin: "0", padding: "0", border: "none" }}>
            <Accordion.Toggle
              as={Button}
              block
              eventKey="0"
              className="accordionBtn"
            >
              EARRINGS
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{ margin: "0", padding: "10px" }}>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Link to="/products_earrings#prodSection">
                    <strong>Show All Earrings</strong>
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_earrings-drop#prodSection">Drops</Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_earrings-hook#prodSection">Hooks</Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_earrings-stud#prodSection">Studs</Link>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          style={{
            margin: "0",
            marginTop: "10px",
            padding: "0",
            border: "none",
          }}
        >
          <Card.Header style={{ margin: "0", padding: "0", border: "none" }}>
            <Accordion.Toggle
              as={Button}
              block
              eventKey="1"
              className="accordionBtn"
            >
              HAIR ACCESSORIES
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body style={{ margin: "0", padding: "10px" }}>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Link to="/products_hair#prodSection">
                    <strong>Show All Hair Accessories</strong>
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_hair-snapclips#prodSection">
                    Snap Clips
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_hair-turban#prodSection">Turbans</Link>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          style={{
            margin: "0",
            marginTop: "10px",
            padding: "0",
            border: "none",
          }}
        >
          <Card.Header style={{ margin: "0", padding: "0", border: "none" }}>
            <Accordion.Toggle
              as={Button}
              block
              eventKey="2"
              className="accordionBtn"
            >
              BABY CLOTHES
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body style={{ margin: "0", padding: "10px" }}>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Link to="/products_baby#prodSection">
                    <strong>Show All Baby Clothes</strong>
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_baby-beanie_diaper_set#prodSection">
                    Beanie & Diaper Set
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card
          style={{
            margin: "0",
            marginTop: "10px",
            padding: "0",
            border: "none",
          }}
        >
          <Card.Header style={{ margin: "0", padding: "0", border: "none" }}>
            <Accordion.Toggle
              as={Button}
              block
              eventKey="3"
              className="accordionBtn"
            >
              HOME & PERSONAL ACCESSORIES
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body style={{ margin: "0", padding: "10px" }}>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <Link to="/products_home_personal#prodSection">
                    <strong>Show All Home & Personal Accessories</strong>
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_home_personal-alcoholders#prodSection">
                    Alcoholders / Alcopouches
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_home_personal-coasters#prodSection">
                    Coasters
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to="/products_home_personal-penholder#prodSection">
                    Pen Holders
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      {/* <Link to="/products_category3#prodSection">
        <BtnSideNav>Category 3</BtnSideNav>
      </Link> */}
    </Menu>
  );
};

export default Sidebar;
