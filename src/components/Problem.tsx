"use client";
import React, { Suspense } from "react";
import Markdown from "react-markdown";

const Problem = ({ problem }: any) => {
  return (
    <div className="pl-20 mt-4 h-full">
      <div className="pt-10">
        <h1 className="text-3xl">{problem && problem.problem_title}</h1>
      </div>
      <div className=" h-full ">
        <div className="test-left py-2 overflow-y-auto mt-10 ">
          <div
            dangerouslySetInnerHTML={{ __html: problem?.problem_description }}
          />
        </div>
      </div>
    </div>
  );
};

export default Problem;
