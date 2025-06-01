import React, { useState, useEffect, use } from "react";
import Block from "./Block";
import db from "../../db.ts";
import { BlockProps, Content, CalendarProps } from "../Types.ts";
import { Timestamp } from "firebase/firestore";

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

const toDate = (data: any): Date => {
  if (data instanceof Date) return data;
  if (data && typeof data === "object" && "seconds" in data) {
    return new Date(data.seconds * 1000);
  }
  return new Date(data);
};

const BlocksCalendar = (props: CalendarProps) => {
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

  const isSameDay = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const showCurrentDate = () => {
    const now = new Date();
    setCurrentDate(now);
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setCurrentDay(now.getDate());
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "c") {
        e.preventDefault();
        showCurrentDate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className={`grid grid-cols-1 gap-3  ${props.className}`}>
        <div className="col-span-full bg-amber-600 text-4xl felx flex-col">
          {currentYear}-{currentMonth + 1}-{currentDay}
          <div className="flex flex-row gap-10 justify-between">
            <div onClick={prevMonth}>{arrowLeft}</div>
            <div
              onClick={() => {
                showCurrentDate();
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

          const contentDay = props.contents?.filter((content) => {
            const ConvertedDate = toDate(content.date);
            return isSameDay(ConvertedDate, day);
          });

          return (
            <div
              className="flex flex-row gap-1 items-center w-full"
              key={index}
            >
              {isCurrentDate ? <div>Today</div> : null}

              <Block
                id={day.toString()}
                content={
                  contentDay && contentDay.length > 0 ? contentDay : null
                }
                date={day}
                key={day.toString()}
                color={(contentDay?.length ?? 0) > 0 ? "#e03a15" : ""}
                className="w-full"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BlocksCalendar;
