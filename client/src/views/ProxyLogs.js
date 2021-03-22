import React, { useState, useEffect } from "react";
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

const TokensTable = ({ keys }) => (
  <Table striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>Api Key</th>
        <th>UserId</th>
        <th>Api Key Logs</th>
        <th>Created At</th>
      </tr>
    </thead>
    {keys.map((key, i) => (
      <tbody key={i}>
        <tr>
          <td key={key.tokenId}>{key.tokenId}</td>
          <td key={key.user_id}>{key.user_id}</td>
          <td key={i}>{JSON.stringify([...key.logs])}</td>
          <td key={key.createdAt}>{key.createdAt}</td>
        </tr>
      </tbody>
    ))}
  </Table>
);

const ProxyLogs = React.memo((props) => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    TokenService.getAllTokens().then(
      (response) => {
        setKeys(response.data);
      },
      (error) => {
        console.error("Could not get keys!");
      }
    );
  }, []);

  return (
    <section>
      {" "}
      <TokensTable keys={keys} />{" "}
    </section>
  );
});

export default ProxyLogs;
