"use client";

import errorifier from "@/helpers/errorifier";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      const e = errorifier(error);
      setError(true);
      throw new Error(e.message);
    }
  };

  useEffect(() => {}, [token]);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, []);

  return (
    <div>
      <h1>lol</h1>
    </div>
  );
};
export default Page;
