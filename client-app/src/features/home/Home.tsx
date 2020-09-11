import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";

const Home = () => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>Welcome Home</h1>
      <h3>
        Go to the <Link to="/activities">Activities page</Link>
      </h3>
    </Container>
  );
};

export default Home;
