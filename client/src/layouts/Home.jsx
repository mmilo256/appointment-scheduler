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
    <>
      {unresolvedAppointments ? (
        <div className="bg-amber-100 shadow">
          <Container>
            <div className="flex justify-between items-center">
              <p className="py-6 text-lg font-semibold text-amber-700">
                {" "}
                Atención: Hay audiencias sin propuesta de solución (
                {unresolvedAppointments})
              </p>
              <Link
                to="/appointments"
                className="bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded text-white"
              >
                Ver audiencias
              </Link>
            </div>
          </Container>
        </div>
      ) : ""}
      <Container>
        <div className="mt-20">
          <HomeGrid />
        </div>
      </Container>
    </>
  );
}

export default Home;
