"use client";
import errorifier from "@/helpers/errorifier";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
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
