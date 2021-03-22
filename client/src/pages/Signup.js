import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Container, Navbar } from "react-bootstrap";

import AuthService from "../services/auth.service";

const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function validateForm() {
    return email?.length > 0 && password?.length > 0 && username?.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    AuthService.register(username, email, password).then(
      () => {
        history.push("/login");
      },
      (error) => {
        console.error("Signup was unsuccessful!");
      }
    );
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Fleek Demo</Navbar.Brand>
      </Navbar>

      <div className="Signup">
        <Container>
          <Form onSubmit={handleSubmit}>
            <hr />
            <h2>Signup</h2>
            <hr />
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Signup
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Signup;
