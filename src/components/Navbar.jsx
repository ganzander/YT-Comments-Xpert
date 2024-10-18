"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [decoded, setDecoded] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      try {
        const decodedToken = jwt.decode(JSON.parse(token));
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("AuthToken");
    location.reload();
  }

  function toggleDropdown() {
    setDropdownVisible((prev) => !prev);
  }

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
          {decoded ? (
            <div className="relative">
              <div
                className="font-normal sm:font-medium cursor-pointer"
                onClick={toggleDropdown}
              >
                {`Hi, ${decoded.fname}`}
              </div>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-24 md:w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <div
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="font-normal sm:font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
