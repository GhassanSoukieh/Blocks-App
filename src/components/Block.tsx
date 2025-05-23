import React, { useState } from "react";
import { BlockProps } from "../Types.ts";

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

const Block = (props: BlockProps) => {
  const dateNumber = props.date?.getDate();
  const dayName = getDayName(props.date!);

  return (
    <div
      className={`border-1 transition duration-200 hover:scale-110 rounded-2xl ${props.className}`}
    >
      {dateNumber}
      <div> {dayName}</div>
    </div>
  );
};

export default Block;
