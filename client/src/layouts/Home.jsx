import React, { useContext } from "react";
import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import { AuthContext } from "../context/AuthContext";
import HomeGrid from "../components/Home/HomeGrid";

function Home() {
  return (
    <Container>
      <Heading>Inicio</Heading>
      <HomeGrid />
    </Container>
  );
}

export default Home;
