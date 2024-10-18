"use client";
import React, { useEffect, useState } from "react";
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
      <div className="h-full w-full flex flex-col items-center justify-center antialiased relative">
        <div className="w-full flex justify-center items-center mt-4 mb-20">
          <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800">
            Loading ...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center antialiased relative">
      {videoData == {} ? (
        <div className="w-full flex justify-center items-center mt-4 mb-20">
          <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800">
            No Video Found
          </h2>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center vid-dt p-10 gap-4">
          <div className="video-top w-full text-lg sm:text-xl md:text-2xl ps-2 font-semibold">
            {videoData.title}
          </div>
          <div className="video-bottom flex flex-col md:flex-row justify-center items-center w-full gap-10">
            <div className="bg-black rounded-t-2xl flex items-center h-[75%] w-[75%] md:h-[50%] md:w-[50%] flex-col">
              <img
                src={videoData.thumbnail}
                className="h-full w-full object-contain rounded-t-2xl"
                alt="Thumbnail"
              />
              <div className="bg-black rounded-b-2xl text vid-ct content flex flex-col sm:flex-row ps-2 pe-2 pb-2 left-0 bottom-0 w-[100%] items-center gap-4">
                <div className="w-full sm:w-1/2 tracking-tighter font-medium text-xl sm:text-2xl text-gray-50">
                  {videoData.channelTitle}
                </div>
                <div className="w-full sm:w-1/2 flex flex-col sm:flex-row justify-evenly rounded-b-2xl">
                  <div className="font-normal flex items-center text-sm text-gray-50">
                    <IoEyeSharp className="mr-2" />
                    {videoData.viewCount}
                  </div>
                  <div className="font-normal flex items-center text-sm text-gray-50">
                    <FcLike className="mr-2" />
                    {videoData.likeCount}
                  </div>
                  <div className="font-normal flex items-center text-sm text-gray-50">
                    <AiOutlineComment className="mr-2" />
                    {videoData.commentCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex comments flex-col gap-2 justify-evenly items-center w-[40%]">
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
        className=" tracking-tighter rounded-md text-[16px] sm:text-sm md:text-lg lg:text-xl w-full p-2 md:p-5 bg-white"
      >
        {heading}
      </button>
    </div>
  );
}
