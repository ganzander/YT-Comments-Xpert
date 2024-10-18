"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [loginCred, setLoginCred] = useState({
    email: "",
  });
  const [otp, setOTP] = useState("");
  const [loginViaOTP, setLoginViaOTP] = useState(true);
  const [enterOTP, setEnterOTP] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const { email } = loginCred;
    if (!email) {
      toast.error("Please fill email.");
    } else if (email) {
      toast.success("Sending OTP");
      axios.post("/api/sendOTP-email", { email }).then((result) => {
        if (result.data.Success === true) {
          toast.success(result.data.msg);
          setLoginViaOTP(false);
          setEnterOTP(true);
        } else {
          toast.error(result.data.msg);
        }
      });
    }
  }

  function handleChange(event) {
    setLoginCred({
      ...loginCred,
      [event.target.name]: event.target.value,
    });
  }

  function handleChangeOTP(event) {
    setOTP(event.target.value);
  }

  function handleSubmitOTP(e) {
    e.preventDefault();
    const { email } = loginCred;
    if (!otp) {
      toast.error("Please enter the OTP");
    } else if (email) {
      axios.post("/api/verifyOTP-email", { email, otp }).then((result) => {
        if (result.data.Success === true) {
          toast.success(result.data.message);
          localStorage.setItem(
            "AuthToken",
            JSON.stringify(result.data.AuthToken)
          );
          router.push("/");
        } else {
          toast.error(result.data.message);
        }
      });
    }
  }

  return (
    <div className="home-body relative w-full h-full flex justify-around items-center">
      {loginViaOTP && (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white shadow-2xl dark:bg-black">
          <h2 className="uppercase font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Password Assistance
          </h2>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={loginCred.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                name="email"
                autoComplete="off"
              />
            </LabelInputContainer>

            <button
              className="bg-black relative group/btn dark:from-zinc-900 dark:to-zinc-900 block dark:bg-zinc-800 w-full text-white dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Send OTP &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      )}
      {enterOTP && (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-2xl bg-white dark:bg-black">
          <h2 className="uppercase font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            OTP Verification
          </h2>
          <form className="my-8" onSubmit={handleSubmitOTP}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                autoComplete="off"
                name="otp"
                required
                value={otp}
                onChange={handleChangeOTP}
              />
            </LabelInputContainer>
            <button
              className="bg-black relative group/btn dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full text-white dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Verify OTP &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      )}
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
