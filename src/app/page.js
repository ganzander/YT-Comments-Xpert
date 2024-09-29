"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  function handleChange(event) {
    setUrl(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter the url.");
    } else {
      axios.post("/api/yt-details", { url }).then((result) => {
        if (result.data.Success === true) {
          console.log(result.data)
        } else {
          toast.error(result.data.msg);
        }
      });

      setUrl("");
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#eee] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-7 md:p-8 shadow-2xl bg-white dark:bg-black">
        <h2 className="uppercase font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          YT Comments Xpert
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="url">Paste the YouTube URL</Label>
            <Input
              id="url"
              name="url"
              value={url}
              onChange={handleChange}
              placeholder="URL"
              type="text"
              autoComplete="off"
              required
            />
          </LabelInputContainer>
          <button
            className="relative group/btn mt-4 bg-black text-white dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit &rarr;
            <BottomGradient />
          </button>


          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>


      </div>
    </div >
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
