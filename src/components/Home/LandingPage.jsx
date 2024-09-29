"use client";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col sm:flex-row gap-4 items-center justify-center px-4 "
      >
        <div className="w-[80%] sm:w-[50%] flex flex-col items-center justify-center">
          <div className="text-2xl sm:text-5xl md:text-6xl font-bold dark:text-white text-center">
            Shree Balaji Opticals
          </div>
          <div className="font-extralight text-justify tracking-tighter text-base sm:text-xl md:text-2xl dark:text-neutral-200 py-4">
            Shree Balaji Opticals is here to help you see the world more
            clearly.
          </div>
          <button
            onClick={() => {
              router.push("/frames");
            }}
            className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-2 py-1 sm:px-2 sm:py-1 md:px-4 md:py-2"
          >
            Shop Now
          </button>
        </div>
        <div className="w-[80%] sm:w-[50%] flex items-center justify-center">
          <div className="relative flex items-center justify-center w-full h-[30vh] sm:w-[35vw] sm:h-[35vh] md:w-[50vw] md:h-[50vh] overflow-hidden mb-4">
            <Image
              src="https://images.unsplash.com/photo-1580745223935-aefed3be334c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxleWV3ZWFyJTIwbW9kZWxzfGVufDB8fDB8fHww"
              alt="Hero logo"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
