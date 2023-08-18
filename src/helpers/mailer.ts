import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import errorifier from "./errorifier";

interface IUserData {
  email: string;
  username: string;
  password: string;
  id: string;
}

// we destructure email and id from the user object
// the emailType arg should be declared as an enum
// the "type" is referring to the purpose of the email:
// password recovery, confirmation, info, etc
export const sendEmail = async (
  { email, id }: IUserData,
  emailType: string
) => {
  try {
    const hashedToken = await bcryptjs.hash(id.toString(), 12);

    if (emailType === "verify") {
      await User.findByIdAndUpdate(id, {
        verifyToken: hashedToken,
        // makes the verify token expire in 60 minutes
        verifyTokenExpiry: Date.now() + 60 * 60 * 1000,
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(id, {
        forgotPasswordToken: hashedToken,
        // makes the password token expire in 10 minutes
        forgotPasswordTokenExpiry: Date.now() + 10 * 60 * 1000,
      });
    }

    if (!(process.env.NODEMAILER_USER && process.env.NODEMAILER_PASS)) {
      throw new Error(
        "you forgot to add your mailtrap / mailing client credentials to the .env file"
      );
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  } catch (error) {
    const e = errorifier(error);
    throw new Error(e.message);
  }
};
