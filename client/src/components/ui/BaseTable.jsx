import React from "react";

function BaseTable({ columns, data, isLoading }) {

  return (
    <>
      <div className="overflow-x-auto rounded shadow overflow-hidden">
        <table className="min-w-full table">
          <thead className="bg-primary-500 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.label}
                  className={`px-2 py-2 whitespace-nowrap font-semibold text-xs text-left`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr
                key={index}
                className="odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200"
              >
                {Object.values(row).map((cell, cellIndex) => {
                  return (
                    <td
                      key={cellIndex}
                      className="px-2 py-1.5 border-b min-w-sm text-ellipsis border-gray-200 text-sm"
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <p className="text-center">Cargando</p>}
    </>
  );
}

export default BaseTable;
