import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import BtnPink from "./../Forms/ButtonPink";

const ClientProfileCards = ({ name, img, desc, fb, insta, twitter }) => {
  return (
    <Card className="profileCard">
      <Card.Img variant="top" src={img} className="profileImg" />
      <Card.Body>
        <Card.Title className="clientName">{name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem className="clientDesc">{desc}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <p>Follow me on:</p>
        <div className="followClient">
          <a href={fb} target="_blank">
            <BtnPink>
              <i class="fa fa-facebook" aria-hidden="true"></i> Facebook
            </BtnPink>
          </a>
        </div>
        <div className="followClient">
          <a href={insta} target="_blank">
            <BtnPink>
              <i class="fa fa-instagram" aria-hidden="true"></i> Instagram
            </BtnPink>
          </a>
        </div>
        <div className="followClient">
          <a href={twitter} target="_blank">
            <BtnPink>
              <i class="fa fa-twitter" aria-hidden="true"></i> Twitter
            </BtnPink>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClientProfileCards;
