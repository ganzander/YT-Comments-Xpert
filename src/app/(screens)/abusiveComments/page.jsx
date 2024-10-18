"use client";
import React, { useState, useEffect } from "react";
export default function Page() {
  const [abusiveCommentsData, setAbusiveCommentsData] = useState([]);

  useEffect(() => {
    const abusiveComments = JSON.parse(localStorage.getItem("abusiveComments"));
    if (abusiveComments) {
      setAbusiveCommentsData(abusiveComments);
    }
  }, []);

  return (
    <div className="h-full w-full rounded-[40px] flex items-center justify-center bg-[rgb(148,214,226)] relative">
      <div className="w-[90%] md:w-[80%] lg:w-[75%] flex py-4 h-full">
        {abusiveCommentsData === null ? (
          <div className="w-full mt-4 flex justify-center items-center">
            <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
              Loading...
            </h2>
          </div>
        ) : abusiveCommentsData.length === 0 ? (
          <div className="w-full mt-4 flex justify-center items-center">
            <h2 className="uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
              Congratulations!! <br /> No Abusive Comments
            </h2>
          </div>
        ) : (
          <div className="bg-[#f5f5f5] rounded-xl shadow-lg px-4 w-full h-full overflow-y-scroll">
            <h2 className="uppercase font-bold text-lg md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
              Abusive Comments
            </h2>
            {abusiveCommentsData.map((comments, index) => (
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
