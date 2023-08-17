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
      <h1>Signup</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <label htmlFor="email">Email</label>
      <label htmlFor="password">Password</label>
    </div>
  );
};
export default Page;
