import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import errorifier from "./errorifier";

declare module "jsonwebtoken" {
  export interface JwtPayload {
    id: string;
    username: string;
    email: string;
  }
}

export default function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!process.env.TOKEN_SECRET) {
      throw new Error("you forgot your token secret");
    }

    const decodedToken: JwtPayload | string = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    );

    if (typeof decodedToken === "string") {
      throw new Error("the decoded token was a string, not a user");
    }

    return decodedToken;
  } catch (error) {
    const e = errorifier(error);
    throw new Error(e.message);
  }
}
