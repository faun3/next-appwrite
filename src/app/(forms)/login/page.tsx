"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const Page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};

  return (
    <div className="flex flex-col items-center justify-center py-2 bg-white p-10 rounded-lg">
      <h1 className="text-5xl font-bold tracking-wide my-10 text-sky-500">
        Login
      </h1>
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
        className="px-4 py-2 bg-sky-400 enabled:hover:bg-sky-600 enabled:active:bg-sky-700 enabled:active:scale-95 focus:outline-none rounded-lg shadow-md text-orange-50 text-lg font-bold tracking-wide disabled:cursor-not-allowed disabled:opacity-7"
        onClick={onLogin}>
        Join
      </button>
      <p className="text-gray-500 my-6">
        Don&apos;t have an account?&nbsp;
        <Link href={"/signup"} className="text-sky-500 underline">
          Sign up
        </Link>{" "}
        instead.
      </p>
    </div>
  );
};
export default Page;
