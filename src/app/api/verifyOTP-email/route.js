"use server";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import User from "@/utils/models/User";

function generateAuthToken(newuser) {
  try {
    const token = jwt.sign(
      {
        user_id: newuser._id,
        fname: newuser.fname,
        lname: newuser.lname,
        email: newuser.email,
        isVerifiedEmail: newuser.isVerifiedEmail,
      },
      process.env.HASH_KEY
    );
    return token;
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req) {
  const { email, otp } = await req.json();
  const UserFound = await User.findOne({ email: email });

  if (UserFound) {
    if (UserFound.otp === Number(otp)) {
      const authToken = generateAuthToken(UserFound);
      return Response.json({
        Success: true,
        AuthToken: authToken,
        message: "OTP Verified",
      });
    } else {
      return Response.json({
        Success: false,
        message: "Incorrect OTP",
      });
    }
  } else {
    return Response.json({ Success: false, message: "User not registered" });
  }
}
