import React, { useState, useEffect, use } from "react";
import Day from "./Day.tsx";
import db from "../../db.ts";
import { BlockProps, Content, CalendarProps } from "../Types.ts";
import { Timestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

const Calendar = (props: CalendarProps) => {
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

  const { currentMonthParam } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(
    currentMonthParam
      ? parseInt(currentMonthParam, 10) - 1
      : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());
  const [color, setColor] = useState("");

  const isSameDay = (a: Date, b: Date) => {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  };

  const navigator = useNavigate();

  const showCurrentDate = () => {
    const now = new Date();
    setCurrentDate(now);
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setCurrentDay(now.getDate());
    navigator(`/create/${now.getMonth() + 1}`);
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
    let nextMonthNum,
      nextYear = currentYear;
    if (currentMonth === 11) {
      nextMonthNum = 1; // January
      nextYear = currentYear + 1;
      setCurrentMonth(0);
      setCurrentYear(nextYear);
    } else {
      nextMonthNum = currentMonth + 2; // +1 for next month, +1 for 1-indexed
      setCurrentMonth(currentMonth + 1);
    }
    navigator(`/create/${nextMonthNum}`);
  };

  const prevMonth = () => {
    let prevMonthNum,
      prevYear = currentYear;
    if (currentMonth === 0) {
      prevMonthNum = 12; // December
      prevYear = currentYear - 1;
      setCurrentMonth(11);
      setCurrentYear(prevYear);
    } else {
      prevMonthNum = currentMonth; // already 1-indexed
      setCurrentMonth(currentMonth - 1);
    }
    navigator(`/create/${prevMonthNum}`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (!isInput && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        showCurrentDate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    console.log("gfgfg", currentMonthParam);
  }, [currentMonthParam]);

  return (
    <>
      <div className={`grid grid-cols-7 gap-2 ${props.className}`}>
        <div className="col-span-full  text-4xl flex flex-col pb-10">
          <div className="border-2 rounded-2xl p-3 cursor-default">
            {currentYear}-{currentMonth + 1}
          </div>
          <div className="flex flex-row gap-10 justify-between pt-10">
            <div className="cursor-pointer" onClick={prevMonth}>
              {arrowLeft}
            </div>
            <div
              className="text-lg rounded-3xl border-1 p-4 hover:bg-green-500 transition duration-300 cursor-pointer"
              onClick={() => {
                showCurrentDate();
              }}
            >
              Today
            </div>
            <div className="cursor-pointer" onClick={nextMonth}>
              {arrowRight}
            </div>
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

          const contentTitle = contentDay?.[0]?.title ?? "";

          const isWeekend = day.getDay() === 0 || day.getDay() === 6;
          const colStart = day.getDay() === 0 ? 7 : day.getDay();

          const colStartClasses = {
            1: "col-start-1",
            2: "col-start-2",
            3: "col-start-3",
            4: "col-start-4",
            5: "col-start-5",
            6: "col-start-6",
            7: "col-start-7",
          };

          return (
            // This return is only for the day box.
            <div
              className={`flex flex-row items-center ${colStartClasses[colStart]}`}
              key={index}
            >
              <Day
                returningDate={currentDate}
                id={day.toString()}
                content={
                  contentDay && contentDay.length > 0 ? contentDay : null
                }
                date={day}
                key={day.toString()}
                color={contentDay && contentDay.length > 0 ? "#662E9B" : ""}
                className={
                  "" +
                  (isWeekend ? "bg-gray-600" : "bg-red") +
                  " rounded-lg w-full"
                }
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
