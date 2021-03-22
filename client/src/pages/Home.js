import React, { useState, useEffect } from "react";
import ProxyLogs from "views/ProxyLogs";
import {
  Navbar,
  ProgressBar,
  Button,
  Form,
  Row,
  Col,
  Container,
  Table,
} from "react-bootstrap";
import TokenService from "services/token.service";

const Home = () => {
  const [key, setKey] = useState("");

  const createApiKey = async (event) => {
    event.preventDefault();

    TokenService.createApiKey().then(
      (response) => {
        setKey(response.data?.key);
      },
      (error) => {
        console.error("key creation failed!");
      }
    );
  };

  const deleteApiKey = async (event) => {
    event.preventDefault();

    const tokenId = event?.target?.elements?.tokenId.value;

    TokenService.deleteApiKey(tokenId).then(
      (response) => {
        setKey("");
        window.location.reload();
      },
      (error) => {
        console.error("key deletion failed!");
      }
    );
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Fleek Demo</Navbar.Brand>
      </Navbar>

      <Container>
        <hr />
        <Form onSubmit={createApiKey}>
          <Row>
            <Col>
              <Button type="submit" variant="info">
                Create New Token
              </Button>{" "}
            </Col>
            <Col>
              <Form.Group controlId="tokenId">
                <Form.Control plaintext readOnly defaultValue={key} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <hr />
        <Form onSubmit={deleteApiKey}>
          <Row>
            <Col>
              <Form.Group controlId="tokenId">
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Token Id To Delete"
                />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit" variant="info">
                Remove Token
              </Button>{" "}
            </Col>
          </Row>
        </Form>
        <hr />
        <h2>Proxy Logs</h2>
        <hr />
        <ProxyLogs />
      </Container>
    </>
  );
};

export default Home;
