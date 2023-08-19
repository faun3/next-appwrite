import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
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
