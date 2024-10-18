"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";

export default function Page() {
  const [demandingCommentsData, setDemandingCommentsData] = useState(null);

  useEffect(() => {
    const demandingComments = JSON.parse(
      localStorage.getItem("demandingComments")
    );
    if (demandingComments) {
      setDemandingCommentsData(demandingComments);
    } else {
      setDemandingCommentsData([]);
    }
  }, []);

  return (
    <div className="h-full w-full rounded-[40px] flex items-center justify-center bg-[rgb(148,214,226)] relative">
      <div className="w-[90%] md:w-[80%] lg:w-[75%] flex py-4 h-full">
        {demandingCommentsData === null ? (
          <div className="w-full mt-4 flex justify-center items-center">
            <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
              Loading...
            </h2>
          </div>
        ) : demandingCommentsData.length === 0 ? (
          <div className="w-full mt-4 flex justify-center items-center">
            <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
              No Demanding Comments
            </h2>
          </div>
        ) : (
          <div className="bg-[#f5f5f5] rounded-xl shadow-lg px-4 w-full h-full overflow-y-scroll">
            <h2 className="uppercase font-bold text-lg md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
              Demanding Comments
            </h2>
            {demandingCommentsData.map((comments, index) => (
              <div
                className="sm:flex flex-col border-b-[1px] py-3 rounded-sm "
                key={index}
              >
                <div className="comment-left w-full sm:w-1/4 text-[12px] sm:text-sm font-semibold pb-1 ">
                  {comments.author}
                </div>
                <div className="comment-right w-full sm:w-3/4 text-sm sm:text-[16px]">
                  {comments.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
