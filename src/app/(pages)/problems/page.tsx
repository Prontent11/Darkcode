"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProblemSet = () => {
  const router = useRouter();
 
  const Logout = async () => {
    try {
      await axios.get("./api/logout");
      console.log("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center px-20 py-10 border-solid border border-white-500 h-screen ">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-3xl text-center my-5 ">Problems</h1>
        <button
          onClick={Logout}
          className="bg-red-500 px-3 py-2 rounded-xl text-white"
        >
          Logout
        </button>
      </div>
      <div className=" border-solid border border-white-500 w-full h-full px-5 py-5 flex flex-col items-center gap-3 ">
        <Link
          href={"problems/1"}
          className="py-2 px-2 border-solid border border-white-500 w-full"
        >
          Problem 1
        </Link>
      </div>
    </div>
  );
};

export default ProblemSet;
