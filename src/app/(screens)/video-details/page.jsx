"use client";
import React, { useEffect, useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";
import { FcLike } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function VideoDetails() {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const videoDetails = JSON.parse(localStorage.getItem("videoDetails"));
    if (videoDetails) {
      setVideoData(videoDetails);
    }
  }, []);

  if (!videoData) {
    return (
      <div className="h-screen w-full flex flex-col  items-center justify-center bg-[#eee] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        <div className="w-full flex justify-center items-center mt-4 mb-20">
          <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
            Loading ...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col  items-center justify-center pb-10 bg-[#eee] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {videoData == {} ? (
        <div className="w-full flex justify-center items-center mt-4 mb-20">
          <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
            No Video Found
          </h2>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center mt-20">
          <h2 className="uppercase mb-5 font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
            {videoData.title}
          </h2>
          <div className="max-w-xs w-full group/card">
            <div
              className={cn(
                "cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4 bg-cover"
              )}
              style={{
                backgroundImage: `url(${videoData.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black  opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10"></div>
              <div className="text content">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                  {videoData.channelTitle}
                </h1>
                <div className="font-normal flex items-center text-sm text-gray-50 relative z-10 my-1">
                  <IoEyeSharp className="mr-2" />
                  {videoData.viewCount}
                </div>
                <div className="font-normal flex items-center text-sm text-gray-50 relative z-10 my-1">
                  <FcLike className="mr-2" />
                  {videoData.likeCount}
                </div>
                <div className="font-normal flex items-center text-sm text-gray-50 relative z-10 my-1">
                  <AiOutlineComment className="mr-2" />
                  {videoData.commentCount}
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-5 md:gap-0 w-full items-center text-center justify-evenly mt-20 mx-auto">
            <FlexMessages
              heading="View Negative Comments"
              redirectRoute="negativeComments"
            />
            <FlexMessages
              heading="View Positive Comments"
              redirectRoute="positiveComments"
            />
          </div>
          <div className="flex md:flex-row flex-col gap-5 md:gap-0 w-full items-center text-center justify-evenly mt-5">
            <FlexMessages
              heading="View Abusive Comments"
              redirectRoute="abusiveComments"
            />
            <FlexMessages
              heading="View Demanding Comments"
              redirectRoute="demandingComments"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FlexMessages({ redirectRoute, heading, className }) {
  const router = useRouter();
  return (
    <div className={"w-full shadow-lg" + className}>
      <button
        onClick={() => router.push(`/${redirectRoute}`)}
        className=" tracking-tighter text-sm sm:text-lg md:text-xl lg:text-2xl w-[60%] p-5 bg-slate-600 text-white"
      >
        {heading}
      </button>
    </div>
  );
}
