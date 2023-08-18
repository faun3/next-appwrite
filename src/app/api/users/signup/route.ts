// TODO
// add typings to this document (it's infected with any's because of the request)
// TODO

import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    // this is similar to req.body when using Express
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // we can query by email only because the field is unique
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    // hash pass with bcrypt
    const salt = await bcryptjs.genSalt(12);
    const hashedPass = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      JSON.stringify({
        message: "new user was created",
        success: true,
        savedUser,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json(
        `someone threw a non error: ${JSON.stringify(err)}`,
        { status: 500 }
      );
    }
  }
};
