"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          localStorage.setItem(
            "videoDetails",
            JSON.stringify(result.data.videoDetails)
          );

          localStorage.setItem(
            "negativeComments",
            JSON.stringify(result.data.negativeComments)
          );

          localStorage.setItem(
            "positiveComments",
            JSON.stringify(result.data.positiveComments)
          );

          localStorage.setItem(
            "abusiveComments",
            JSON.stringify(result.data.abusiveComments)
          );

          localStorage.setItem(
            "demandingComments",
            JSON.stringify(result.data.demandingComments)
          );
          setIsLoading(false);
          router.push("/video-details");
        } else {
          setIsLoading(false);
          toast.error(result.data.msg);
        }
      });
    }
  }

  return (
    <>
      <div className="home-body relative w-full h-full flex justify-around items-center">
        <div className=" home-left flex flex-col justify-center items-center bg-white p-10 rounded-[40px] w-[30vw] shadow-lg ">
          <form className="my-8 w-full" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4 gap-4">
              <Label htmlFor="url" className="text-center !text-black">
                Just paste the YouTube Video URL
              </Label>
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

            <div className="w-full flex justify-center items-center mt-4">
              {isLoading ? (
                <button className="flex bg-[#0E1322] text-white justify-center items-center w-1/2 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]">
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                  <BottomGradient />
                </button>
              ) : (
                <button
                  className="mt-4 bg-[#0E1322] text-white block w-1/2 dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                  type="submit"
                  onClick={() => {
                    if (url) {
                      setIsLoading(true);
                    }
                  }}
                >
                  Submit &rarr;
                  <BottomGradient />
                </button>
              )}
            </div>
          </form>
          <button className="flex bg-[#0c1148] text-white justify-center items-center w-[90%] rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]">
            <Link
              href="https://captionizer-star.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Got To Captionizer &rarr;
            </Link>
            <BottomGradient />
          </button>
        </div>
        <div className="home-right">
          <img className="w-[30vw]" src="/images/utube.png" />
        </div>
        <div className="w-[340px] rnd-box h-12 bg-red-400 rounded-lg absolute border-2 border-black top-9 right-[-50px] rotate-12"></div>
        <div className="w-[400px] rnd-box h-12 bg-blue-400 rounded-lg absolute border-2 border-black top-12 rotate-[-15deg]"></div>
        <div className="w-[300px] rnd-box h-12 bg-yellow-400 rounded-lg absolute border-2 border-black bottom-[50px] right-[30%] rotate-45"></div>
        <div className="w-[400px] rnd-box h-12 bg-green-400 rounded-lg absolute border-2 border-black bottom-10 left-[-200px]"></div>
      </div>
    </>
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
