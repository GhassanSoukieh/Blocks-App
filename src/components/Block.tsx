import React, { useState } from "react";
import { BlockProps } from "../Types.ts";

const Block = (props: BlockProps) => {
  return (
    <div className="border-1 bg-{props.color = bla ba}">
      {props.date.toString()}
    </div>
  );
};

export default Block;
