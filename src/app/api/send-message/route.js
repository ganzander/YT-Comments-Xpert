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
    const { email, name, message } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ Success: false, msg: "Email not registered" });
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: "shreebalajiopticals2023@gmail.com",
      subject: "OTP Validation",
      text: `Dear Kartikey, 
        I hope this message finds you well. I wanted to inform you that ${name} has sent you an email. You can reach him at ${email}. In his/her message, he has expressed the following:
        "${message}"
        Please feel free to respond directly to him via email if you have any questions or need further clarification.`,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ Success: true, msg: "Message sent" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return Response.json({ Success: false, msg: "An error occurred" });
  }
}
