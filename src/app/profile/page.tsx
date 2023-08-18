"use client";
import errorifier from "@/helpers/errorifier";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// TODO
// add a nav and footer component
//
// the nav should provide a logout button if you are logged in
// if you are not logged in, it should have a log in button instead
// TODO

const Page = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      await setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (error) {
      const errorified = errorifier(error);
      toast.error(errorified.message);
    }
  };

  const getUserId = async () => {
    try {
      // to get the json in the next response, we use .data (this is like res.body)
      const res = await axios.get("/api/users/me");
      // the .data from .data is the user data
      const userData = res.data.data;
      // we get the mongo _id from the user data json
      return userData._id;
    } catch (error) {
      const e = errorifier(error);
      toast.error(e.message);
    }
  };

  const [id, setId] = useState(0);

  useEffect(() => {
    const helper = async () => {
      const id = await getUserId();
      setId(id);
    };
    helper();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <div>Your user id is {id}</div>
      <hr />
      <button
        className="bg-sky-500 px-4 py-2 text-xl font-bold tracking-wide text-white rounded-lg shadow-md my-8 hover:bg-sky-600 active:bg-sky-700 active:scale-95 active:shadow"
        onClick={logout}>
        Log out
      </button>
    </div>
  );
};
export default Page;
