"use client";
import Footer from "@/components/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typeof window !== "undefined") {
        const storedAuthToken = JSON.parse(localStorage.getItem("AuthToken"));
        if (storedAuthToken) {
          const decodedToken = jwt.decode(storedAuthToken);
          if (decodedToken) {
            setIsAdmin(decodedToken.isAdmin);
            clearInterval(intervalId);
          }
        } else {
          clearInterval(intervalId);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      router.push("/");
    }
  }, [isAdmin]);

  return (
    <>
      <div className="min-h-screen pt-24 w-full flex items-center justify-center bg-[#F6F5F2] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        {isAdmin === true && (
          <div className="flex flex-col">
            <h2 className="w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Choose
            </h2>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:justify-around sm:items-center sm:w-screen">
              <Button onClick={() => router.push("admin/addItem")}>
                Add Item
              </Button>
              <Button onClick={() => router.push("admin/updateItem")}>
                Update Item
              </Button>
              <Button onClick={() => router.push("admin/viewItem")}>
                View Item
              </Button>
            </div>
          </div>
        )}
        {isAdmin === false && (
          <div className="flex flex-col items-center">
            <h2 className="capitalize w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              You are not authorized
            </h2>
          </div>
        )}
        {isAdmin === null && (
          <div className="flex flex-col items-center">
            <h2 className="w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Loading ...
            </h2>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
