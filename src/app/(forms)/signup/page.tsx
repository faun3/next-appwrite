"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      toast.success("Account created!");
      console.log(res.data);
      await setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length && user.username.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const router = useRouter();

  return (
    <>
      <Toaster></Toaster>
      <div className="flex flex-col items-center justify-center py-2 bg-white p-10 rounded-lg">
        {loading ? (
          <div className="py-6">
            <FadeLoader color="rgb(14 165 233)" />
          </div>
        ) : (
          <h1
            className={`text-5xl font-bold tracking-wide my-10 text-sky-500  : `}>
            Sign up
          </h1>
        )}
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
          className="px-4 py-2 bg-sky-400 enabled:hover:bg-sky-600 enabled:active:bg-sky-700 enabled:active:scale-95 focus:outline-none rounded-lg shadow-md text-orange-50 text-lg font-bold tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
          onClick={onSignup}
          disabled={buttonDisabled || loading}>
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
    </>
  );
};
export default Page;
