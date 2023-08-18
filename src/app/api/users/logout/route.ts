import errorifier from "@/helpers/errorifier";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json({
      message: "logout successful",
      success: true,
    });
    // we set the token cookie to empty so the user session ends
    res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return res;
  } catch (error) {
    const errorified = errorifier(error);
    return NextResponse.json({ error: errorified.message });
  }
}
