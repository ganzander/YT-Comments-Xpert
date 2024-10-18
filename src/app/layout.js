"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavbarDemo from "@/components/Navbar";
import { useState } from "react";
import { IconSun } from "@tabler/icons-react";
import "@/css/responsive.css";

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
      <body className="antialiased home-font ">
        {/* <NavbarDemo changeTheme={changeTheme} /> */}

        <div className="h-screen w-full flex justify-center items-center bg-[#0E1322] relative overflow-hidden">
          {/* <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      /> */}

          <div className="home w-[90%] flex flex-col justify-center items-center h-full">
            {/* ------------------ NAVBAR ---------------------- */}
            <div className="custom-navbar flex bg-[#] items-center justify-between w-full ">
              <div className="nav-left relative bg-[rgb(148,214,226)] rounded-tl-[40px]  rounded-tr-[40px] font-bold px-12 w-[23%] text-center text-[25px] py-6">
                <button>CommentsIQ</button>
                <div className="h-10 absolute w-10 bg-[rgb(148,214,226)] left-[100%] bottom-0 z-10 ">
                  <div className="bg-[#0E1322] w-10 h-10 rounded-bl-[40px]"></div>
                </div>
              </div>
              <div className="nav-right text-white flex gap-8 pe-10">
                <button className="z-20 ">
                  <IconSun />
                </button>
                <div className=" ">Login</div>
              </div>
            </div>

            <div className="h-[80%] home-wrapper w-full bg-[rgb(148,214,226)] rounded-[40px] rounded-tl-[0px]">
              {children}
            </div>
          </div>
        </div>

        {/* {children} */}
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
