import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/db/db";
import errorifier from "@/helpers/errorifier";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connect();

    const decoded = await getDataFromToken(req);

    const foundUser = await User.findById(decoded.id).select("-password");

    return NextResponse.json({
      message: "user found",
      data: foundUser,
    });
  } catch (error) {
    const e = errorifier(error);
    return NextResponse.json({ error: e.message });
  }
}
