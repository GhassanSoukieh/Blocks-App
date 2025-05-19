import { useState } from "react";
import Block from "../../data/block.js";

function Homepage() {
  return (
    <div className="grid grid-cols-5 bg-gray-200 p-1 gap-10">
      <div className="flex-col col-start-4 ">
        <div className="bg-amber-900 p-5"></div>
        <div className="bg-amber-600 p-5"></div>
      </div>
    </div>
  );
}

export default Homepage;
