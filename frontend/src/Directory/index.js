import React from "react";
import "./styles.css";
import Logo2 from "./../Assets/PC-logo2.png";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Container, Form } from "react-bootstrap";

const Directory = (props) => {
  return (
    <Container fluid className="directory p-0">
      <div className="wrap">
        <div className="rect-bg">
          <img className="logo2" src={Logo2} alt="Penelope's Collectionz" />
        </div>
        <Row>
          <Col
            md={{ span: 4, offset: 7 }}
            sm={{ span: 12, offset: 12 }}
            className="login"
          >
            <div className="rect-login">
              <h1 class="userLogin">
                <i class="fa fa-heart" aria-hidden="true"></i>
              </h1>
              <h2 class="userLogin">Welcome!</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    <i class="fa fa-envelope" aria-hidden="true"></i> Email
                    address
                  </Form.Label>
                  <Form.Control
                    size="lg"
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>
                    <i class="fa fa-lock" aria-hidden="true"></i> Password
                  </Form.Label>
                  <Form.Control
                    size="lg"
                    type="password"
                    placeholder="Password"
                  />
                  <p class="forgotPwd">
                    <a class="forgotPwd" href="#">
                      Forgot Password?
                    </a>
                  </p>
                </Form.Group>
                <Button
                  block
                  variant="primary"
                  type="submit"
                  className="btn-lg btn-login"
                  size="lg"
                >
                  LOGIN
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Directory;
