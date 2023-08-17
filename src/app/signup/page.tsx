"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const Page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold tracking-wide my-10 text-sky-500">
        Signup
      </h1>
      <label htmlFor="username">Username</label>
      <input
        className="px-4 py-2 rounded-lg border-gray-300 focus:border-gray-600 focus:outline-none mb-4 shadow-md"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="johnnydoe6381"
      />
      <label htmlFor="email">Email</label>
      <input
        className="px-4 py-2 rounded-lg border-gray-300 focus:border-gray-600 focus:outline-none mb-4 shadow-md"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="jjdoesie@mail.com"
      />
      <label htmlFor="password">Password</label>
      <input
        className="px-4 py-2 rounded-lg border-gray-300 focus:border-gray-600 focus:outline-none mb-4 shadow-md"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button
        className="px-4 py-2 bg-sky-400 hover:bg-sky-600 active:bg-sky-700 active:scale-95 focus:outline-none rounded-lg shadow-md text-orange-50 text-lg font-bold tracking-wide"
        onClick={onSignup}>
        Join
      </button>
      <p className="text-gray-500 my-6">
        Already have an account?&nbsp;
        <Link href={"/login"} className="text-sky-500 underline">
          Log in
        </Link>{" "}
        instead.
      </p>
    </div>
  );
};
export default Page;
