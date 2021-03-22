import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  Navbar,
  AccordionCollapse,
} from "react-bootstrap";

import AuthService from "services/auth.service";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return username?.length > 0 && password?.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    AuthService.login(username, password).then(
      () => {
        history.push("/home");
      },
      (error) => {
        console.error("Login was unsuccessful!");
      }
    );
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Fleek Demo</Navbar.Brand>
      </Navbar>

      <div className="Login">
        <Container>
          <Form onSubmit={handleSubmit}>
            <hr />
            <h2>Login</h2>
            <hr />
            <Form.Group size="lg" controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
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
              Login
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Login;
