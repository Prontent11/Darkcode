import React from "react";

const Problem = ({ problem }: any) => {
  return (
    <div className="px-4 md:pl-10 mt-4">
      <div className="pt-10">
        <h1 className="text-3xl">{problem && problem.problem_title}</h1>
      </div>
      <div className="h-full mt-4 md:mt-10">
        <div className="test-left py-2 overflow-y-auto">
          <div
            className="prose lg:prose-xl" // Use 'prose' and 'lg:prose-xl' for responsive text styles
            dangerouslySetInnerHTML={{ __html: problem?.problem_description }}
          />
        </div>
      </div>
    </div>
  );
};

export default Problem;
