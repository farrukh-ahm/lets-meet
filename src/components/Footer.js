import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <div>
      <footer>
        <Container>
          <Row>
            <Col className="text-center py-3">Copyright &copy; Leet's Meet</Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default Footer;
