import { connect } from "@/db/db";
import { NextRequest, NextResponse, userAgent } from "next/server";
import User from "@/models/userModel";
import errorifier from "@/helpers/errorifier";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const reqBody = await req.json();

    const { token } = reqBody;

    // finds the user whose verify token matches the one in the request
    // and whose token is not expired
    const foundUser = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!foundUser) {
      return NextResponse.json(
        {
          error: "User not found (token is invalid or expired)",
        },
        { status: 400 }
      );
    }

    // if we found the user we verify them by setting the verified field to true
    foundUser.isVerified = true;
    // we also need to clear out the verify token and its expiry because they are now unnecessary
    foundUser.verifyToken = undefined;
    foundUser.verifyTokenExpiry = undefined;

    await foundUser.save();
  } catch (error) {
    const e = errorifier(error);
    return NextResponse.json(
      {
        error: e.message,
      },
      { status: 500 }
    );
  }
}
