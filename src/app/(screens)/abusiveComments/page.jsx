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
import { IconH1 } from "@tabler/icons-react";

export default function Page() {
  const [abusiveCommentsData, setAbusiveCommentsData] = useState([]);

  useEffect(() => {
    const abusiveComments = JSON.parse(localStorage.getItem("abusiveComments"));
    if (abusiveComments) {
      setAbusiveCommentsData(abusiveComments);
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col  items-center justify-center pb-10 bg-[#eee] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="w-[95%] sm:w-[80%] lg:w-1/2 flex justify-center items-center mt-20 mb-20">
        {abusiveCommentsData.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Abusive Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {abusiveCommentsData.map((comments, id) => (
                <TableRow key={id}>
                  <TableCell>{comments.author}</TableCell>
                  <TableCell>{comments.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full mt-4">
            <div className="">
              <h2 className="whitespace-nowrap uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
                Congratulations !!
              </h2>
            </div>
            <div className="w-full">
              <h2 className="w-full uppercase font-bold text-3xl md:text-5xl text-center text-neutral-800 dark:text-neutral-200">
                No Abusive Comments
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
