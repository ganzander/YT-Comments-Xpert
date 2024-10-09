"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";

export default function Page() {
  const [negativeCommentsData, setNegativeCommentsData] = useState(null);

  useEffect(() => {
    const negativeComments = JSON.parse(
      localStorage.getItem("negativeComments")
    );
    if (negativeComments) {
      setNegativeCommentsData(negativeComments);
    } else {
      setNegativeCommentsData([]);
    }
  }, []);

  return (
    <div className="h-full w-full rounded-[40px] flex flex-col items-center justify-center bg-[rgb(148,214,226)] relative">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="w-[90%] md:w-[80%] lg:w-[75%] flex py-4 h-full">
        {negativeCommentsData === null ? (
          <div className="w-full mt-4">
            <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
              Loading...
            </h2>
          </div>
        ) : negativeCommentsData.length === 0 ? (
          <div className="w-full mt-4">
            <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
              No Negative Comments
            </h2>
          </div>
        ) : (
          <div className='bg-[#f5f5f5] rounded-xl shadow-lg px-4 w-full h-full overflow-y-scroll' >
            {negativeCommentsData.map((comments, index) => (
              <div className='flex border-b-[1px] py-3 rounded-sm ' key={index} >
                <div className="comment-left w-1/4 text-[12px] sm:text-sm font-semibold ">{comments.author}</div>
                <div className="comment-right w-3/4 text-sm sm:text-[16px]">{comments.text}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
