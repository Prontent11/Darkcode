"use client";
import axios from "axios";
import React, { useState } from "react";
import Markdown from "react-markdown";
const Admin = () => {
  const [problem, setProblem] = useState({
    title: "",
    description: "",
    input: "",
    output: "",
  });
  const Submit = async () => {
    try {
      alert("Are you sure you want to submit");
      const response = await axios.post("./api/problems", problem);
      console.log(response.data);
    } catch (error) {
      console.log("Something went wrong in problem creation", error);
    }
    setProblem({
      title: "",
      description: "",
      input: "",
      output: "",
    });
  };
  return (
    <div>
      <div className="header text-4xl text-center py-5 border-b-2 border-solid border-white">
        Admin Panel
      </div>
      <div className="p-10  flex flex-col gap-3">
        <div className="container">
          <label className="text-2xl" htmlFor="title">
            Problem Title
          </label>
          <input
            type="text"
            className="ml-2 rounded-md p-2 text-black"
            required
            value={problem.title}
            onChange={(e: any) =>
              setProblem({ ...problem, title: e.target.value })
            }
          />
        </div>
        <div className="flex items-center justify-evenly">
          <div className="container flex flex-col  ">
            <label className="text-2xl" htmlFor="description">
              Problem Description
            </label>
            <textarea
              value={problem.description}
              onChange={(e: any) =>
                setProblem({ ...problem, description: e.target.value })
              }
              required
              className="rounded-xl w-[400px] h-[50vh]  p-5 resize-none text-black"
            />
          </div>
          <div className="container flex flex-col  ">
            <label className="text-2xl" htmlFor="description">
              Problem Preview
            </label>
            <Markdown className=" overflow-y-auto rounded-xl w-[400px] h-[50vh] bg-gray-200 p-5 resize-none text-black">
              {problem.description}
            </Markdown>
          </div>
        </div>
        <div className="flex items-center justify-evenly">
          <div className="container flex flex-col  ">
            <label className="text-2xl" htmlFor="description">
              Input
            </label>
            <textarea
              required
              className="rounded-xl w-[250px] h-[15vh]  p-1 resize-none text-black"
              value={problem.input}
              onChange={(e: any) =>
                setProblem({ ...problem, input: e.target.value })
              }
            />
          </div>
          <div className="container flex flex-col  ">
            <label className="text-2xl" htmlFor="description">
              Output
            </label>
            <textarea
              required
              className="rounded-xl w-[250px] h-[15vh]  p-1 resize-none text-black"
              value={problem.output}
              onChange={(e: any) =>
                setProblem({ ...problem, output: e.target.value })
              }
            />
          </div>
        </div>
        <div className="container">
          <button
            className="rounded-md px-3 py-2 bg-green-500"
            onClick={Submit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
