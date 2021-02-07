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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
        voluptatem, sit suscipit amet quisquam, consequatur a aperiam iusto
        similique saepe dignissimos facere cupiditate unde! Voluptatem deserunt
        quae tempore nesciunt, tenetur cumque, quidem dolorem adipisci saepe
        dolor eveniet, dolores delectus. Nulla nisi earum nesciunt eaque quo
        natus velit dolorum eum minima eos quas repudiandae et error laudantium,
        soluta fugiat necessitatibus consequatur consequuntur non, magni odio
        suscipit iste, iusto assumenda. Id, maxime incidunt unde fugiat est
        consequuntur iure accusantium, praesentium deleniti sint ipsa quam rem
        ratione fuga commodi voluptatem quaerat quas ullam quasi ipsam alias
        nemo laborum eaque hic. Odio, molestiae velit.
      </p>

      <h1 className="aboutUs-sectiontitle">Meet the Team</h1>

      <Container>
        <Row className="justify-content-md-center">
          <ClientProfileCards
            name="Ms. Jean Jhen Ace B. Ferrer"
            img={clientExampleA}
            desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae rem ad voluptas natus! Esse, eligendi."
            fb="https://www.facebook.com/"
            twitter="https://www.twitter.com/"
            insta="https://www.instagram.com/"
          />
          <ClientProfileCards
            name="Mr. Marc Aldwin R. Cortez"
            img={clientExampleB}
            desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae rem ad voluptas natus! Esse, eligendi."
            fb="https://www.facebook.com/"
            twitter="https://www.twitter.com/"
            insta="https://www.instagram.com/"
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
