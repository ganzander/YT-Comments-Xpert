"use client";
import Footer from "@/components/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { cn } from "@/lib/utils";
import Image from "next/image";

function CardDemo(props) {
  const bgImage = Math.floor(Math.random() * 10) + 1;
  const backgroundImageUrl = `/eyewear-profiles/${bgImage}.jpg`;

  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4"
        )}
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src="/eyewear-profiles/1.jpg"
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {props.fname + " " + props.lname}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 mt-2">
            {props.email}
          </p>
          <p className="font-normal text-sm text-gray-50 relative z-10 mt-1 mb-2">
            {props.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuthToken = localStorage.getItem("AuthToken");
      if (storedAuthToken) {
        const token = JSON.parse(storedAuthToken);
        const decoded = jwt.decode(token);
        if (decoded) {
          setDecodedToken(decoded);
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <>
      <div className="min-h-screen pt-24 w-full flex items-center justify-center bg-[#F6F5F2] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        {decodedToken ? (
          <div className="flex flex-col">
            <h2 className="w-full text-center pb-5 text-base sm:text-xl md:text-4xl font-semibold text-neutral-800 dark:text-neutral-200 font-sans">
              Welcome, {decodedToken.fname}
            </h2>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:justify-around sm:items-center sm:w-screen">
              <CardDemo
                fname={decodedToken.fname}
                lname={decodedToken.lname}
                email={decodedToken.email}
                phone={decodedToken.phone}
              />
            </div>
          </div>
        ) : decodedToken === null ? (
          <div className="flex flex-col items-center">
            <h2 className="w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Loading ...
            </h2>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="capitalize w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Please Log In
            </h2>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
