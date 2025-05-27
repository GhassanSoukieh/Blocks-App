import React, { useState, useEffect, use } from "react";
import Block from "./Block";
import db from "../../db.ts";
import { BlockProps, Content } from "../Types.ts";

const arrowLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const arrowRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

const BlocksCalendar = ({ className = "" }) => {
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
  const [contents, setContents] = useState<Content[]>([]);

  const fetchContent = async () => {
    try {
      const allBlocks = await db.get("Content");
      setContents(allBlocks ?? []);
      console.log("Blocks fetched successfully");
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  const monthName = months[currentDate.getMonth()];
  const monthAsNumber = currentDate.getMonth() + 1;
  const currentYearAsNumber = currentDate.getFullYear();
  const currentDayAsNumber = currentDate.getDate();

  const calendar = (showthisMonth: number) => {
    const firstDayOfMonth = new Date(currentYear, showthisMonth, 1);
    const lastDayOfMonth = new Date(
      currentYear,
      showthisMonth + 1,
      0
    ).getDate();
    const daysInMonth: Date[] = [];

    for (let i = 1; i <= lastDayOfMonth; i++) {
      const day = new Date(currentYear, showthisMonth, i);
      daysInMonth.push(day);
    }
    return daysInMonth;
  };

  const calander = calendar(currentMonth);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <>
      <div className={`grid grid-cols-1 gap-3  ${className}`}>
        <div className="col-span-full bg-amber-600 text-4xl felx flex-col">
          {currentYear}-{currentMonth + 1}-{currentDay}
          <div className="flex flex-row gap-10 justify-between">
            <div onClick={prevMonth}>{arrowLeft}</div>
            <div
              onClick={() => {
                const now = new Date();
                setCurrentDate(now);
                setCurrentMonth(now.getMonth());
                setCurrentYear(now.getFullYear());
                setCurrentDay(now.getDate());
              }}
            >
              Current Month
            </div>
            <div onClick={nextMonth}>{arrowRight}</div>
          </div>
        </div>
        {calander.map((day, index) => {
          const isCurrentDate =
            day.getFullYear() === currentDate.getFullYear() &&
            day.getMonth() === currentDate.getMonth() &&
            day.getDate() === currentDate.getDate();

          const contentDay = contents.find((content) => {
            if (content.date === day) {
              return content;
            }
          });

          return (
            <Block
              id={day.toString()}
              content={contentDay ? [contentDay] : null}
              key={day.toString()}
              date={day}
            />
          );
        })}
      </div>
    </>
  );
};

export default BlocksCalendar;
