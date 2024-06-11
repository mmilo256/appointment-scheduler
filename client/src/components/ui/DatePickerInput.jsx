import React, { useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  addWeeks,
} from "date-fns";
import { es } from "date-fns/locale";

const DatePickerInput = ({ currentDate, setCurrentDate }) => {
  useEffect(() => {
    const startDay = addWeeks(startOfWeek(currentDate, { weekStartsOn: 1 }), 1);
    setCurrentDate(startDay);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });

  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  const monthsList = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const selectDay = (date) => {
    setCurrentDate(date);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      {/** Cabecera calendario */}
      <div className="flex justify-between items-center py-2">
        <button
          type="button"
          className="bg-primary-500 font-black rounded text-white h-10 w-10"
          onClick={handlePreviousMonth}
        >
          {"<"}
        </button>
        <h2 className="text-primary-400 font-bold capitalize">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </h2>
        <button
          type="button"
          className="bg-primary-500 font-black rounded text-white h-10 w-10"
          onClick={handleNextMonth}
        >
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7">
        {monthsList.map((day) => (
          <div className="font-bold p-1 text-primary-400 text-center" key={day}>
            {day}
          </div>
        ))}
        {/** Cuerpo calendario */}
        {dates.map((date) => (
          <button
            type="button"
            disabled={format(date, "E") !== "Mon"}
            onClick={() => selectDay(date)}
            key={date.toString()}
            className={`text-center p-1 rounded font-black disabled:text-gray-400 disabled:font-normal  ${
              currentDate.toDateString() === date.toDateString()
                ? "bg-secondary-500 text-white"
                : "text-secondary-500"
            }`}
          >
            {format(date, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatePickerInput;
