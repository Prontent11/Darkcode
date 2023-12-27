"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onSignUp = async () => {
    try {
      const response = await axios.post("./api/signup", user);
      console.log("Signup successfully", response.data);
      toast.success("SignedUp Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      router.push("/login");
    } catch (error) {
      console.log("Error signup" + error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen border border-solid border-white">
      <div className="flex flex-col h-1/2 items-center gap-2">
        <h1 className="text-3xl mb-5">Login</h1>
        <label htmlFor="username">Username</label>
        <input
          className=" mx-2 rounded-md text-black px-2 py-1"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          className=" mx-2 rounded-md text-black px-2 py-1"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          className=" mx-2 rounded-md text-black px-2 py-1"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={onSignUp}
          className="bg-blue-500 w-fit rounded-xl p-1 px-5"
        >
          Signup
        </button>
        <p>
          Already have an account ? <Link href={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
