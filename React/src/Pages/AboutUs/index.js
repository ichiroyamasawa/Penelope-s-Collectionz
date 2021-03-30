import React from "react";
import "./styles.css";
import ClientProfileCards from "./../../Components/clientProfileCards";

import clientExampleA from "./../../Assets/woman.png";
import clientExampleB from "./../../Assets/man.png";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const AboutUs = (props) => {
  return (
    <div className="aboutUs">
      <h1 className="aboutUs-sectiontitle">About Us</h1>
      <p className="aboutUs-body">
        At Penelope’s Collectionz, we assure that every locally handmade and
        handcrafted creations we deliver to you is made with passion and with
        utmost quality since 2019. We believe that our products should not only
        make you look pretty and sassy but also feel confident and good about
        yourself as well.
      </p>

      <h1 className="aboutUs-sectiontitle">Meet the Team</h1>

      <Container>
        <Row className="justify-content-md-center">
          <ClientProfileCards
            name="Ms. JeanJhen Ace B. Ferrer"
            img={clientExampleA}
            desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae rem ad voluptas natus! Esse, eligendi."
            fb="https://www.facebook.com/gingeraceee"
            // twitter="https://www.twitter.com/"
            insta="https://www.instagram.com/gingeraceee"
          />
          <ClientProfileCards
            name="Mr. Marc Aldwin R. Cortez"
            img={clientExampleB}
            desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae rem ad voluptas natus! Esse, eligendi."
            // fb="https://www.facebook.com/"
            // twitter="https://www.twitter.com/"
            // insta="https://www.instagram.com/"
          />
        </Row>
      </Container>

      {/* 
      <div className="row d-flex justify-content-center">
        <div className="card text-center" style="width: 18rem;">
          <img
            className="card-img-top"
            src="/template/Images/woman.png"
            alt="Owner A"
          />
          <div className="card-body">
            <h5 className="card-title">Owner A</h5>
            <p className="card-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem, vitae.
            </p>
            <p className="card-text">Follow me on:</p>
            <a href="#" className="btn btn-primary followMe">
              <i className="fa fa-facebook" aria-hidden="true"></i>
              Facebook
            </a>{" "}
            <br />
            <br />
            <a href="#" className="btn btn-primary followMe">
              <i className="fa fa-twitter" aria-hidden="true"></i>
              Twitter
            </a>{" "}
            <br />
            <br />
            <a href="#" className="btn btn-primary followMe">
              <i className="fa fa-instagram" aria-hidden="true"></i>
              Instagram
            </a>{" "}
            <br />
            <br />
          </div>
        </div>

        <div className="card text-center" style="width: 18rem;">
          <img
            className="card-img-top"
            src="/template/Images/man.png"
            alt="Owner B"
          />
          <div className="card-body">
            <h5 className="card-title">Owner B</h5>
            <p className="card-text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem, vitae.
            </p>
            <p className="card-text">Follow me on:</p>
            <a href="#" className="btn btn-primary followMe">
              <i className="fa fa-facebook" aria-hidden="true"></i>
              Facebook
            </a>{" "}
            <br />
            <br />
            <a href="#" className="btn btn-primary followMe">
              <i className="fa fa-twitter" aria-hidden="true"></i>
              Twitter
            </a>{" "}
            <br />
            <br />
            <a href="#" className="btn btn-primary followMe">
              <i className="fa fa-instagram" aria-hidden="true"></i>
              Instagram
            </a>{" "}
            <br />
            <br />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AboutUs;
