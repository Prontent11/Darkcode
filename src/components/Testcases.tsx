"use client";
import React, { useState } from "react";

const Testcases = () => {
  const [userInput, setUserInput] = useState();
  return (
    <div>
      <div className="input w-1/2 ">
        <label htmlFor="code-inp" className="text-xl">
          Input
        </label>
        <textarea
          id="code-inp"
          onChange={(e: any) => setUserInput(e.target.value)}
        ></textarea>
      </div>
      <div className="output"></div>
    </div>
  );
};

export default Testcases;
