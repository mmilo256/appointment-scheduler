import React, { useEffect, useState } from "react";
import AppointmentCard from "./AppointmentCard";
import { getAllAppointments } from "../../services/appointmentService";

function AppointmentsList({ data, departments, setRefresh }) {

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        {data?.map((appointment, index) => (
          <AppointmentCard key={index} data={appointment} departments={departments} setRefresh={setRefresh} />
        ))}
      </div>
    </div>
  );
}

export default AppointmentsList;
