const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import User from "@/utils/models/User";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function POST(req) {
  try {
    const { email } = await req.json();

    const OTP = Math.floor(100000 + Math.random() * 900000);

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ Success: false, msg: "Email not registered" });
    }

    await User.updateOne({ email }, { $set: { otp: OTP } });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP Validation",
      text: `Your OTP is: ${OTP}`,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ Success: true, msg: "OTP sent" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return Response.json({ Success: false, msg: "An error occurred" });
  }
}
