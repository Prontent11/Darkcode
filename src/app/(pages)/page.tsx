"use-client";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="text-centre  box-border overflow-hidden h-[700px]">
      <header className=" text-[#ffffff] p-5">
        <h1 className="text-4xl ml-10 mt-10">
          <span className="text-blue-300">Dark</span>Code
        </h1>
      </header>
      <main className="p-20 flex flex-col gap-10">
        <div className="welcome-message text-3xl text-center">
          <p>
            Welcome to LeetCode, your platform for{" "}
            <span className="text-blue-300">coding challenges!</span>
          </p>
        </div>

        <div className="auth-buttons flex justify-center gap-10">
          <Link
            href="/login"
            className="auth-button px-5 py-2 bg-[#ffff]  text-black rounded-xl cursor-pointer hover:bg-blue-300 hover:text-white "
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="auth-button px-5 py-2 bg-[#ffffff]  text-black rounded-xl cursor-pointer hover:hover:bg-blue-300 hover:text-white"
          >
            Sign Up
          </Link>
        </div>

        <div className="features-section mt-5 flex justify-around flex-wrap gap-5">
          <div className="feature-card text-black bg-[#ffffff] smooth-transition hover:scale-110  flex-1 w-[200px] p-5 rounded-md shadow-md shadow-blue-300">
            <h2>Practice Coding</h2>
            <p>
              Sharpen your coding skills by solving a variety of coding
              challenges across different topics and difficulty levels.
            </p>
          </div>

          <div className="feature-card text-black bg-[#ffffff] smooth-transition hover:scale-110 flex-1 w-[300px] p-5 rounded-md shadow-md shadow-blue-300">
            <h2>Compete with Peers</h2>
            <p>
              Participate in coding contests and compete with other programmers
              to test your skills and climb the leaderboards.
            </p>
          </div>

          <div className="feature-card text-black bg-[#ffffff] smooth-transition hover:scale-110 flex-1 w-[300px] p-5 rounded-md shadow-md shadow-blue-300">
            <h2>Learn Algorithms</h2>
            <p>
              Explore and master essential algorithms and data structures to
              become a proficient problem solver.
            </p>
          </div>
        </div>

        <footer className="footer mt-20 text-[#ffffff] bg-blue-400 px-10 mb-0 py-5 border-t border-white">
          <p>&copy; 2023 LeetCode. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
