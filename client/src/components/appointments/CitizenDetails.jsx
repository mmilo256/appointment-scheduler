import React from "react";

function CitizenDetails({ data }) {
  console.log(data);
  return (
    <div className="bg-white h-full p-5 rounded-md shadow">
      <h2 className="text-center text-2xl font-light border-b pb-5 mb-5">
        Datos del solicitante
      </h2>
      <ul className="flex flex-col gap-4">
        <li className="font-bold flex flex-col">
          RUT <span className="font-light text-xl">{data.rut}</span>{" "}
        </li>
        <li className="font-bold flex flex-col">
          Nombre completo{" "}
          <span className="font-light text-xl">{data.first_name}</span>
        </li>
        <li className="font-bold flex flex-col">
          Dirección <span className="font-light text-xl">{data.address}</span>
        </li>
        <li className="font-bold flex flex-col">
          Correo electrónico{" "}
          <span className="font-light text-xl">{data.email}</span>
        </li>
        <li className="font-bold flex flex-col">
          Teléfono <span className="font-light text-xl">{data.phone}</span>
        </li>
        <li className="font-bold flex flex-col">
          Teléfono 2 <span className="font-light text-xl">{data.phone_2}</span>
        </li>
      </ul>
    </div>
  );
}

export default CitizenDetails;
