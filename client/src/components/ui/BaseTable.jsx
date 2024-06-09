import React from "react";

// Componente funcional que representa una tabla básica
function BaseTable({ table, isLoading }) {
  // Renderizado de la tabla con los datos proporcionados
  return (
    <>
      <table className="min-w-full leading-normal shadow rounded-lg overflow-hidden">
        {/* Encabezado de la tabla con estilos de fondo y texto */}
        <thead className="bg-primary-500 text-white">
          <tr>
            {/* Mapeo de las columnas para generar los encabezados */}
            {table.columns.map((col) => (
              <th
                key={col.label}
                className={`px-5 py-3 border-b-2 border-gray-200 text-left text-sm uppercase font-semibold ${col.styles}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        {/* Cuerpo de la tabla */}
        <tbody>
          {/* Mapeo de los datos para generar las filas */}
          {!isLoading &&
            table.data.map((row, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                {/* Mapeo de los valores de cada fila para generar las celdas */}
                {Object.values(row).map((cell, index) => (
                  <td
                    key={index}
                    className="px-5 py-3 border-b border-gray-200 text-sm"
                  >
                    {/* Contenido de la celda */}
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {isLoading && <p className="text-center">Cargando</p>}
    </>
  );
}

export default BaseTable;