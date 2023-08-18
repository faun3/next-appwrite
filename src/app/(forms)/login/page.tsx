"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";
import errorifier from "@/helpers/errorifier";

const Page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("api/users/login", user);
      toast.success("Logged in!");
      await setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      const errorified = errorifier(error);
      toast.error(errorified.message);
      setUser({
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center py-2 bg-white p-10 rounded-lg">
        {loading ? (
          <div className="py-6">
            <FadeLoader color="rgb(14 165 233)" />
          </div>
        ) : (
          <h1 className="text-5xl font-bold tracking-wide my-10 text-sky-500">
            Login
          </h1>
        )}
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
          onClick={onLogin}
          disabled={buttonDisabled || loading}>
          Log in
        </button>
        <p className="text-gray-500 my-6">
          Don&apos;t have an account?&nbsp;
          <Link href={"/signup"} className="text-sky-500 underline">
            Sign up
          </Link>{" "}
          instead.
        </p>
      </div>
    </>
  );
};
export default Page;
