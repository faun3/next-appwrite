import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { HydratedDocument } from "mongoose";
import errorifier from "@/helpers/errorifier";
import jwt from "jsonwebtoken";

export async function POST(req: NextResponse) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    await connect();

    // check if the user exists
    const foundUser = await User.findOne({
      email: email,
    });

    if (!foundUser) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, foundUser.password);

    if (!validPassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 500 });
    }

    // create token data
    const tokenData = {
      id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
    };

    // create jwt
    if (!process.env.TOKEN_SECRET) {
      throw new Error("you forgot your token secret idiot");
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "8h",
    });

    const resp = NextResponse.json({
      message: "login successful",
      success: true,
    });

    resp.cookies.set("token", token, { httpOnly: true });

    return resp;
  } catch (error) {
    const errorifiedValue = errorifier(error);
    throw errorifiedValue;
  }
}
