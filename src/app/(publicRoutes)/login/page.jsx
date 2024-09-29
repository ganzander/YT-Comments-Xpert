"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setLoginCred({
      ...loginCred,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = loginCred;
    if (!email || !password) {
      toast.error("Please fill in the form completely");
    } else {
      axios.post("/api/login", { email, password }).then((result) => {
        if (result.data.Success === true) {
          localStorage.setItem(
            "AuthToken",
            JSON.stringify(result.data.AuthToken)
          );
          toast.success(result.data.msg);
          router.push("/");
        } else {
          toast.error(result.data.msg);
        }
      });

      setLoginCred({
        email: "",
        password: "",
      });
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
          Log In
        </h2>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={loginCred.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              autoComplete="off"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              value={loginCred.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              autoComplete="off"
              required
            />
          </LabelInputContainer>
          <Link href="/loginOTP">
            <small className="text-sm dark:text-xs font-medium text-slate-600 dark:text-slate-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Forgot Password
            </small>
          </Link>
          <button
            className="relative group/btn mt-4 bg-black text-white dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Log In &rarr;
            <BottomGradient />
          </button>
          <div className="w-full text-center">
            <small className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Don&apos;t have an account:{" "}
              <Link href="/register" className="text-blue-500">
                Register
              </Link>
            </small>
          </div>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          {/* <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button> */}
        </form>
      </div>
    </div>
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
