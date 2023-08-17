import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { HydratedDocument } from "mongoose";
import errorifier from "@/helpers/errorifier";

const POST = async () => {
  try {
    // TODO
    // write this part
    // TODO
  } catch (error) {
    const errorifiedValue = errorifier(error);
    throw errorifiedValue;
  }
};

export default POST;
