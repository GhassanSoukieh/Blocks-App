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

  const currentDate = () => {
    const today = new Date();
    return (
      today.getFullYear() === props.date?.getFullYear() &&
      today.getMonth() === props.date?.getMonth() &&
      today.getDate() === props.date?.getDate()
    );
  };

  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className={`border-1 transition duration-200 hover:scale-110  text-xs ${props.className} cursor-pointer `}
      style={{ backgroundColor: props.color || undefined }}
    >
      {currentDate() ? (
        <span className=" rounded-full border-1 border-white bg-white text-black">
          {dateNumber}
        </span>
      ) : (
        dateNumber
      )}
      <div>
        {" "}
        {dayName}
        {props.content && props.content.length > 0 && (
          <div className={`text-xs `}>
            {props.content.map((item) => (
              <div className={`${item.color} rounded-2xl`} key={item.id}>
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;
