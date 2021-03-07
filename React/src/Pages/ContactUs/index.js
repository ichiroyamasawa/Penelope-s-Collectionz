import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import mapIMG from "./../../Assets/MapSample.jpg";
import shopeeIMG from "./../../Assets/shopee-logo.png";

const ContactUs = (props) => {
  return (
    <div className="contactUs">
      <h1 className="contactUs-sectionTitle">Contact Us</h1>
      <Container className="contactUsWrapper">
        <Row>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h4 className="contactUsDetails">
                    <i class="fa fa-phone" aria-hidden="true"></i> Contact
                    Number: 0997 063 2962
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4 className="contactUsDetails">
                    <i class="fa fa-envelope" aria-hidden="true"></i> Email:{" "}
                    <a
                      href="mailto:penelopescollectionz@gmail.com"
                      className="contactUsEmail"
                    >
                      penelopescollectionz@gmail.com
                    </a>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col className="mt-2">
                  <h4 className="contactUsDetails">Follow us on:</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="followUsBtnLinks">
                    <a
                      href="https://www.facebook.com/penelopescollectionz"
                      target="_blank"
                    >
                      <Button block size="lg">
                        <i class="fa fa-facebook" aria-hidden="true"></i>{" "}
                        Facebook
                      </Button>
                    </a>
                    <a
                      href="https://www.instagram.com/penelopescollectionz/"
                      target="_blank"
                    >
                      <Button block className="btn-instagram" size="lg">
                        <i class="fa fa-instagram" aria-hidden="true"></i>{" "}
                        Instagram
                      </Button>
                    </a>
                    <a
                      href="https://shopee.ph/penelopes_collectionz"
                      target="_blank"
                    >
                      <Button
                        block
                        className="btn-shopee shadow-none"
                        size="lg"
                      >
                        <img
                          className="shopee-logo"
                          src={shopeeIMG}
                          alt="Shopee Logo"
                        />{" "}
                        Shopee
                      </Button>
                    </a>
                    <br />
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <Container>
              <Row>
                <Col>
                  <h4 className="contactUsDetails">
                    <i class="fa fa-location-arrow" aria-hidden="true"></i>{" "}
                    Location:
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <img src={mapIMG} alt="Map" className="contactUsMap" />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
