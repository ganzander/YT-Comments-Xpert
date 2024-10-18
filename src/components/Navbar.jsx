"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="custom-navbar flex items-center justify-between w-full">
        <div className="nav-left relative uppercase bg-[rgb(148,214,226)] rounded-tl-[40px] rounded-tr-[40px] font-bold sm:px-12 px-6 w-[23%] text-center text-[15px] sm:text-[25px] py-6">
          <Link href="/">Yt Comments Xpert</Link>
          <div className="h-10 absolute w-10 bg-[rgb(148,214,226)] left-[100%] bottom-0 z-10 ">
            <div className="bg-[#0E1322] w-10 h-10 rounded-bl-[40px]"></div>
          </div>
        </div>

        <div className="nav-right text-white flex sm:gap-8  text-center text-[17px] sm:text-[25px] ">
          <Link href="/login" className="font-normal sm:font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
