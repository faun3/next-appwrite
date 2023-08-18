import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import errorifier from "./errorifier";

export default function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!process.env.TOKEN_SECRET) {
      throw new Error("you forgot your token secret");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    return decodedToken;
  } catch (error) {
    const e = errorifier(error);
    throw new Error(e.message);
  }
}
