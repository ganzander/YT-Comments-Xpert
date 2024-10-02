"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavbarDemo from "@/components/Navbar";
import { useState } from "react";

const metadata = {
  title: "YT Comment Xpert",
  description: "Developed by Ganesh Mangla",
};

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("dark");

  function changeTheme() {
    if (theme === "dark") {
      setTheme("");
    } else if (theme === "") {
      setTheme("dark");
    }
  }

  return (
    <html lang="en" className={`overflow-x-hidden ${theme}`}>
      <body className="antialiased">
        <NavbarDemo changeTheme={changeTheme} />
        {children}
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
