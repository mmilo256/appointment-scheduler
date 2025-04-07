import React, { useEffect } from "react";
import Container from "../components/ui/Container";
import HomeGrid from "../components/Home/HomeGrid";
import { useAppointmentStore } from "../stores/useAppointmentStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function Home() {
  return (
    <Container>
      <div className="mt-20">
        <HomeGrid />
      </div>
    </Container>
  );
}

export default Home;
