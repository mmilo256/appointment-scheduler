import React from "react";

function CitizenDetails({ data }) {
  return (
    <div className="bg-white h-full p-5 rounded-md shadow">
      <h2 className="text-center text-2xl font-light border-b pb-5 mb-5">
        Datos del solicitante
      </h2>
      {Object.keys(data).length === 0 ? (
        <p className="text-center">No se ha seleccionado ningún solicitante</p>
      ) : (
        <ul className="flex flex-col gap-1">
          <li className="font-bold">
            <p>RUT</p> <span className="font-normal">{data.rut}</span>
          </li>
          <li className="font-bold">
            <p>Nombre completo</p>
            <span className="font-normal">{`${data.first_name} ${data.last_name}`}</span>
          </li>
          <li className="font-bold">
            <p>Dirección</p> <span className="font-normal">{data.address}</span>
          </li>
          <li className="font-bold">
            <p>Correo electrónico</p>
            <span className="font-normal">
              {data.email ? data.email : "No tiene"}
            </span>
          </li>
          <li className="font-bold">
            <p>Teléfono</p> <span className="font-normal">{data.phone}</span>
          </li>
          <li className="font-bold">
            <p>Teléfono 2</p>{" "}
            <span className="font-normal">
              {data.phone_2 ? data.phone_2 : "No tiene"}
            </span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default CitizenDetails;
