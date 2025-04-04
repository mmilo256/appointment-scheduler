import React, { useEffect } from "react";
import Container from "../components/ui/Container";
import HomeGrid from "../components/Home/HomeGrid";
import { useAppointmentStore } from "../stores/useAppointmentStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function Home() {
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );

  const getUser = useAuthStore((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const appointments = useAppointmentStore((state) => state.appointments);

  let unresolvedAppointments = 0;

  appointments.forEach((app) => {
    if (!app.response) {
      unresolvedAppointments += 1;
    }
  });

  useEffect(() => {
    (async () => {
      await getAllAppointments();
    })();
  }, [getAllAppointments]);

  return (
    <Container>
      <div className="mt-20">
        <HomeGrid />
      </div>
    </Container>
  );
}

export default Home;
