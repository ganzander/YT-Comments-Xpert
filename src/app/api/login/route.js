"use server";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import User from "@/utils/models/User";
const saltRounds = 10;

function generateAuthToken(newuser) {
  try {
    const token = jwt.sign(
      {
        user_id: newuser._id,
        fname: newuser.fname,
        lname: newuser.lname,
        fname: newuser.fname,
        email: newuser.email,
        isAdmin: newuser.isAdmin,
        isVerifiedPhone: newuser.isVerifiedPhone,
        isVerifiedEmail: newuser.isVerifiedEmail,
        phone: newuser.phone
      },
      process.env.HASH_KEY
    );
    return token;
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req, res) {
  const { email, password } = await req.json();
  if (!email) {
    return Response.json({ Success: false, msg: "Enter your email" });
  } else if (!password) {
    return Response.json({ Success: false, msg: "Enter your password" });
  }

  const emailFind = await User.findOne({ email: email });

  if (emailFind) {
    var checkEncryptedPassword = await bcrypt.compare(
      password,
      emailFind.password
    );

    if (checkEncryptedPassword == true) {
      const authToken = generateAuthToken(emailFind);
      return Response.json({
        Success: true,
        AuthToken: authToken,
        msg: "Successfully Logged In",
      });
    } else {
      return Response.json({ Success: false, msg: "Wrong Password" });
    }
  } else {
    return Response.json({ Success: false, msg: "Please Register First" });
  }
}
