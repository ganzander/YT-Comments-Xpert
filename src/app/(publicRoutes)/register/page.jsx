"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [registerCred, setRegisterCred] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
  });

  function handleChange(event) {
    setRegisterCred({
      ...registerCred,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, mobile, password } = registerCred;
    if (!fname || !lname || !email || !mobile || !password) {
      toast.error("Please fill in the form completely");
    } else {
      axios
        .post("/api/signup", { fname, lname, email, mobile, password })
        .then((result) => {
          if (result.data.Success === true) {
            toast.success(result.data.message);
            router.push("/login");
          } else {
            toast.error(result.data.message);
          }
        });
      setRegisterCred({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
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
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-2xl bg-white dark:bg-black">
        <h2 className="uppercase font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Sign up
        </h2>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                name="fname"
                value={registerCred.fname}
                onChange={handleChange}
                placeholder="First Name"
                autoComplete="off"
                required
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Last Name"
                name="lname"
                autoComplete="off"
                required
                value={registerCred.lname}
                onChange={handleChange}
                type="text"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              required
              value={registerCred.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              autoComplete="off"
              required
              value={registerCred.password}
              onChange={handleChange}
              id="password"
              placeholder="********"
              type="password"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              name="mobile"
              autoComplete="off"
              required
              value={registerCred.mobile}
              onChange={handleChange}
              id="mobile"
              placeholder="Mobile"
              type="tel"
            />
          </LabelInputContainer>

          <button
            className="bg-black text-white relative group/btn dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign Up &rarr;
            <BottomGradient />
          </button>
          <div className="w-full text-center">
            <small className="text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Already have an account:{" "}
              <Link href="/login" className="text-blue-500">
                Log In
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
