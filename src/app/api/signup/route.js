"use server";
const bcrypt = require("bcrypt");
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import User from "@/utils/models/User";
const saltRounds = 10;

export async function POST(req) {
  const { fname, lname, email, mobile, password } = await req.json();
  if (!fname) {
    return Response.json({
      Success: false,
      message: "Please enter your first name",
    });
  } else if (!lname) {
    return Response.json({
      Success: false,
      message: "Please enter your last name",
    });
  } else if (!email) {
    return Response.json({
      Success: false,
      message: "Please enter your email",
    });
  } else if (!mobile) {
    return Response.json({
      Success: false,
      message: "Please enter your mobile number",
    });
  } else if (!password) {
    return Response.json({
      Success: false,
      message: "Please enter your password",
    });
  }
  const mobileNo = `+91${mobile}`;
  try {
    const userExistsEmail = await User.findOne({ email });
    if (userExistsEmail) {
      return Response.json({
        Success: false,
        message: "Email already registered",
      });
    }

    const userExistsMobile = await User.findOne({ phone: mobileNo });
    if (userExistsMobile) {
      return Response.json({
        Success: false,
        message: "Phone Number already registered",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const userSave = new User({
      fname,
      lname,
      email,
      password: encryptedPassword,
      phone: mobileNo,
      isAdmin: false,
    });
    await User.create(userSave);
    return Response.json({
      Success: true,
      message: "You're successfully registered",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ Success: false, message: "Server error" });
  }
}
