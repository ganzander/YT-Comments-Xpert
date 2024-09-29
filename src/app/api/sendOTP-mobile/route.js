const mongoose = require("mongoose");
const twilio = require("twilio");
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import User from "@/utils/models/User";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function POST(req) {
  const { mobile } = await req.json();
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const mobileNo = `+91${mobile}`;

  const UserFound = await User.findOne({ phone: mobileNo });

  if (UserFound) {
    const updateData = await User.updateOne(
      { phone: mobileNo },
      { $set: { otp: OTP } },
      { new: true }
    );
    await twilioClient.messages.create({
      body: `Your OTP code is ${OTP}`,
      from: "+18589016481",
      to: mobileNo,
    });
    return Response.json({
      Success: true,
      msg: "OTP sent",
    });
  } else {
    return Response.json({ Success: false, msg: "Mobile not registered" });
  }
}
