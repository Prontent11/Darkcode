"use client";
import React, { Suspense } from "react";
import Markdown from "react-markdown";

const Problem = ({ problem }: any) => {
  return (
    <>
      <div className="p-5">
        <h1 className="text-3xl">{problem && problem.problem_title}</h1>
        <div className="test-left py-5 overflow-y-auto">
          <Markdown>{problem && problem.problem_description}</Markdown>
        </div>
      </div>
    </>
  );
};

export default Problem;
