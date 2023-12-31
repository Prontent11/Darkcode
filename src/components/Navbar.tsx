import Link from "next/link";
import React, { useContext, useState } from "react";
import Dropdown from "./Dropdown";
import UserContext from "@/app/context/userContext";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      {" "}
      <div className=" p pt-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <Link href="/" className="text-4xl ml-10 mt-10">
              <span className="text-blue-300">Dark</span>Code
            </Link>
          </div>

          {/* Navigation links on the right */}
          <div className="flex flex-wrap items-center gap-5 text-xl">
            <Link
              href="/problems"
              className="text-white hover:bg-blue-300 px-5 py-2 rounded-xl hover:text-white"
            >
              Problems
            </Link>
            {currentUser?.admin && (
              <Link
                href="/admin"
                className="text-white hover:bg-blue-300 px-5 py-2 rounded-xl hover:text-white"
              >
                Admin
              </Link>
            )}
            <div className="rounded-xl">{currentUser && <Dropdown />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
