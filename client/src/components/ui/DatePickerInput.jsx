import React, { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  subWeeks,
  addWeeks,
  addDays,
  isBefore,
} from "date-fns";
import { es } from "date-fns/locale";
import { useAppointmentStore } from "../../stores/useAppointmentStore";

const DatePickerInput = ({ setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const getAvailableTimes = useAppointmentStore(
    (state) => state.getAvailableTimes
  );

  const today = new Date();

  useEffect(() => {
    let startDay;
    if (format(currentDate, "E") === "Mon") {
      startDay = currentDate;
    } else {
      startDay = startOfWeek(addWeeks(currentDate, 1), { weekStartsOn: 1 });
    }
    setCurrentDate(startDay);
  }, []);

  const handlePreviousMonth = () => {
    setCurrentDate(subWeeks(currentDate, 5));
  };

  const handleNextMonth = () => {
    setCurrentDate(addWeeks(currentDate, 5));
  };

  const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });

  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  const monthsList = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const isAvailableDate = (date) => {
    if (format(date, "E") === "Mon" && !isBefore(addDays(date, 1), today)) {
      return true;
    } else {
      return false;
    }
  };

  const selectDay = (date) => {
    getAvailableTimes(format(date, "yyyy-MM-dd"));
    setCurrentDate(date, "yyyy-MM-dd");
    setSelectedDate(date, "yyyy-MM-dd");
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      {/** Cabecera calendario */}
      <div className="flex justify-between items-center py-2">
        <button
          type="button"
          className="bg-primary-500 font-black rounded text-white h-8 w-8"
          onClick={handlePreviousMonth}
        >
          {"<"}
        </button>
        <h2 className="text-primary-400 font-bold capitalize">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </h2>
        <button
          type="button"
          className="bg-primary-500 font-black rounded text-white h-8 w-8"
          onClick={handleNextMonth}
        >
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-x-2">
        {monthsList.map((day) => (
          <div className="font-bold text-primary-400 text-center" key={day}>
            {day}
          </div>
        ))}
        {/** Cuerpo calendario */}
        {dates.map((date) => (
          <button
            type="button"
            disabled={!isAvailableDate(date)}
            onClick={() => selectDay(date)}
            key={date.toString()}
            className={`text-center rounded font-black disabled:text-gray-400 disabled:font-normal  ${
              format(currentDate, "yyyy-MM-dd HH:mm") ===
              format(date, "yyyy-MM-dd HH:mm")
                ? "bg-secondary-500 text-white"
                : "text-secondary-500"
            } ${
              format(today, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                ? "bg-secondary-100"
                : ""
            } `}
          >
            {format(date, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatePickerInput;
