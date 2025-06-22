import React, { useState } from "react";
import { BlockProps } from "../Types.ts";
import { useNavigate } from "react-router-dom";
import { convertDateToString } from "../Functions/DateFunctions.ts";
import InsideBlockView from "../Views(routes)/InsideBlockView.tsx";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getDayName = (date: Date) => {
  const dayNumber = date.getDay();
  const dayName = days[(dayNumber + 6) % 7];
  return dayName;
};

const Day = (props: BlockProps) => {
  const dateNumber = props.date?.getDate();
  const dayName = props.date ? getDayName(props.date) : "";

  const navigate = useNavigate();
  const slash = props.date ? convertDateToString(props.date) : "";

  const handleClick = () => {
    if (slash) {
      navigate(`/block/${slash}`, {
        state: { content: props.content, date: props.date },
      });
    }
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className={`border-1 transition duration-200 hover:scale-110 rounded-2xl text-xs ${props.className}`}
      style={{ backgroundColor: props.color || undefined }}
    >
      {dateNumber}
      <div> {dayName}</div>
    </div>
  );
};

export default Day;
