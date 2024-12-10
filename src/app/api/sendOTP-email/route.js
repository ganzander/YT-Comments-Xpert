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
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; padding-bottom: 10px; border-bottom: 1px solid #e0e0e0; }
            .header h1 { color: #007bff; }
            .content { margin: 20px 0; text-align: center; }
            .otp { font-size: 24px; font-weight: bold; color: #333333; margin: 10px 0; }
            .footer { text-align: center; font-size: 12px; color: #999999; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Your OTP Code</h1>
            </div>
            <div class="content">
                <p>Use the code below to complete your authentication process.</p>
                <div class="otp">${OTP}</div>
                <p>If you did not request this OTP, please ignore this email or contact support.</p>
            </div>
            <div class="footer">
                <p>Thank you for choosing our service!</p>
            </div>
        </div>
    </body>
    </html>
    `;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP Validation",
      html: htmlTemplate,
    };
    await transporter.sendMail(mailOptions);
    return Response.json({ Success: true, msg: "OTP sent" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return Response.json({ Success: false, msg: "An error occurred" });
  }
}
