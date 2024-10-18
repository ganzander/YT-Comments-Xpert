"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavbarDemo from "@/components/Navbar";
import { useState } from "react";
import { IconSun } from "@tabler/icons-react";
import "@/css/responsive.css";
import Navbar from "@/components/Navbar";

const metadata = {
  title: "YT Comment Xpert",
  description: "Developed by Ganesh Mangla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`overflow-x-hidden`}>
      <body className="antialiased home-font ">
        <div className="h-screen w-full flex justify-center items-center bg-[#0E1322] relative overflow-hidden">
          <div className="home w-[90%] flex flex-col justify-center items-center h-full">
            <Navbar />
            <div className="h-[80%] home-wrapper w-full bg-[rgb(148,214,226)] rounded-[40px] rounded-tl-[0px]">
              {children}
            </div>
          </div>
        </div>

        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
