"use client";
import React, { useEffect, useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";
import { FcLike } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Page() {
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
    // antialiased bg-grid-white/[0.02]
    <div className="h-full w-full flex flex-col items-center justify-center antialiased relative">
      {/* <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      /> */}

      {videoData == {} ? (
        <div className="w-full flex justify-center items-center mt-4 mb-20">
          <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
            No Video Found
          </h2>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center p-10 gap-4">
          <div className="video-top w-full flex flex-col gap-10 ps-2 font-semibold">
            {videoData.title}
          </div>
          <div className="video-bottom flex w-full">
            <div className="video-desc w-[60%] items-center flex relative">

              <img className='rounded-2xl shadow-xl' src={videoData.thumbnail} alt="" />

              <div className="text content absolute flex pb-2 ps-2 left-0 bottom-0 w-full items-center gap-4">
                <div className="font-bold text-xl md:text-2xl text-gray-50 relative z-10 ">
                  {videoData.channelTitle}
                </div>
                <div className="font-normal flex items-center justify-center text-sm text-gray-50 relative z-10">
                  <IoEyeSharp className="mr-2" />
                  {videoData.viewCount}
                </div>
                <div className="font-normal flex items-center text-sm text-gray-50 relative z-10">
                  <FcLike className="mr-2" />
                  {videoData.likeCount}
                </div>
                <div className="font-normal flex items-center text-sm text-gray-50 relative z-10">
                  <AiOutlineComment className="mr-2" />
                  {videoData.commentCount}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 justify-evenly items-center w-[40%] h-full' >
              <FlexMessages
                heading="View Negative Comments"
                redirectRoute="negativeComments"
              />
              <FlexMessages
                heading="View Positive Comments"
                redirectRoute="positiveComments"
              />
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
        </div>
      )}
    </div>
  );
}

function FlexMessages({ redirectRoute, heading, className }) {
  const router = useRouter();
  return (
    <div className={"w-full shadow-lg " + className}>
      <button
        onClick={() => router.push(`/${redirectRoute}`)}
        className=" tracking-tighter rounded-md text-[12px] sm:text-sm md:text-lg lg:text-xl w-full p-5 bg-white"
      >
        {heading}
      </button>
    </div>
  );
}
