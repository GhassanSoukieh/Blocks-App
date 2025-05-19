import React, { useState, useEffect, use } from "react";

const BlocksCalendar = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());

  const monthName = months[currentDate.getMonth()];
  const monthAsNumber = currentDate.getMonth() + 1;
  const currentYearAsNumber = currentDate.getFullYear();
  const dayAsNumber = currentDate.getDate();

  const calendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInMonth = [];

    for (let i = 1; i <= lastDayOfMonth; i++) {
      daysInMonth.push(i);
    }

    return daysInMonth;
  };

  const daysNameInMonth = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInMonth = [];
    for (let i = 1; i <= lastDayOfMonth; i++) {
      daysInMonth.push(days[(firstDayOfMonth.getDay() + i - 1) % 7]);
    }
    return daysInMonth;
  };

  const getDayName = (day) => {
    const result = new Date(currentYear, currentMonth, day).getDay();
    console.log("zz", result);
    return days[(result + 6) % 7];
  };

  const calander = calendar();

  return (
    <div className="pt-40">
      <div className="grid grid-cols-7 gap-4">
        <div className="col-start-1 col-span-full text-center font-bold">
          {currentYear} - {monthAsNumber} - {dayAsNumber}
        </div>
        <div className="col-start-1 col-span-full w-full text-center font-bold bg-amber-400">
          {calander.map((day, index) => {
            const isToday =
              day === dayAsNumber &&
              monthAsNumber === currentMonth + 1 &&
              currentYearAsNumber === currentYear;
            return (
              <div
                key={index}
                className={`border border-gray-300 p-2 m-1 text-center col-start-1 col-span-3 ${
                  isToday ? "bg-red-600" : ""
                }`}
              >
                {day}
                <div className="col-start-2">{getDayName(day)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ); //wrapper div;
};

export default BlocksCalendar;
