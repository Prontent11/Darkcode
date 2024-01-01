import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="text-center box-border overflow-hidden">
      <main className="p-8 md:p-20 flex flex-col gap-10">
        <div className="welcome-message text-xl md:text-3xl text-center">
          <p>
            Welcome to{" "}
            <span className="text-blue-300 font-semibold">DarkCode</span>, your
            platform for{" "}
            <span className="text-blue-300 font-semibold">
              coding challenges!
            </span>
          </p>
        </div>

        <div className="auth-buttons flex justify-center gap-4">
          <Link
            href="/problems"
            className="auth-button px-4 py-2 smooth-transition hover:scale-110 bg-white text-black rounded-xl cursor-pointer hover:bg-blue-300 hover:text-white"
          >
            Let's solve problems
          </Link>
        </div>

        <div className="features-section mt-5 flex flex-col md:flex-row items-center justify-center flex-wrap gap-5">
          <div className="feature-card text-black bg-white smooth-transition hover:scale-110 flex-1 w-full md:w-[300px] p-4 md:p-5 rounded-md shadow-md shadow-blue-300">
            <h2 className="text-lg md:text-xl font-semibold">
              Practice Coding
            </h2>
            <p>
              Sharpen your coding skills by solving a variety of coding
              challenges across different topics and difficulty levels.
            </p>
          </div>

          <div className="feature-card text-black bg-white smooth-transition hover:scale-110 flex-1 w-full md:w-[300px] p-4 md:p-5 rounded-md shadow-md shadow-blue-300">
            <h2 className="text-lg md:text-xl font-semibold">
              Compete with Peers
            </h2>
            <p>
              Participate in coding contests and compete with other programmers
              to test your skills and climb the leaderboards.
            </p>
          </div>

          <div className="feature-card text-black bg-white smooth-transition hover:scale-110 flex-1 w-full md:w-[300px] p-4 md:p-5 rounded-md shadow-md shadow-blue-300">
            <h2 className="text-lg md:text-xl font-semibold">
              Learn Algorithms
            </h2>
            <p>
              Explore and master essential algorithms and data structures to
              become a proficient problem solver.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
