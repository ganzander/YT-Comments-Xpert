"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "@/components/Footer";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const [contactCred, setContactCred] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(event) {
    setContactCred({
      ...contactCred,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, name, message } = contactCred;
    if (!email || !name || !message) {
      toast.error("Please fill in the form completely");
    } else {
      axios
        .post("/api/send-message", { email, name, message })
        .then((result) => {
          if (result.data.Success === true) {
            toast.success(result.data.msg);
          } else {
            toast.error(result.data.msg);
          }
        });
      setContactCred({
        name: "",
        email: "",
        message: "",
      });
    }
  }

  return (
    <>
      <div className="min-h-screen pt-24 w-full flex flex-col items-center justify-center bg-[#eee] dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <h2 className="w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Contact
        </h2>

        <div className="flex justify-evenly items-center md:items-start gap-10 ms-10 me-10 w-full md:flex-row flex-col pb-20">
          <div className="max-w-md w-full rounded-lg md:rounded-2xl p-7 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="uppercase font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
              Drop a message
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={contactCred.name}
                  onChange={handleChange}
                  placeholder="Name"
                  type="text"
                  autoComplete="off"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  value={contactCred.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  autoComplete="off"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-1">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={contactCred.message}
                  onChange={handleChange}
                  placeholder="Message"
                  type="text"
                  autoComplete="off"
                  required
                />
              </LabelInputContainer>
              <button
                className="bg-black text-white relative group/btn mt-4 dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Send Message &rarr;
                <BottomGradient />
              </button>

              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
          </div>

          <div className="max-w-md w-full rounded-lg md:rounded-2xl p-7 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="uppercase font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
              Contact Information
            </h2>
            <div className="my-8 text-black dark:text-white flex flex-col items-start gap-5">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Delhi Gate, Main Market - Najafgarh, 110043</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 7042592797</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>shreebalajiopticals2023@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>Everyday: 10am - 9pm</span>
              </div>
            </div>
            <div className="mt-6 bg-gray-300 h-48 md:h-56 lg:h-64 rounded-lg flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14010.329755606117!2d76.98548!3d28.612301!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d11c61ee4cf73%3A0x21df224bbaaddadd!2sSHREE%20BALAJI%20OPTICALS!5e0!3m2!1sen!2sus!4v1726602541507!5m2!1sen!2sus"
                width="600vw"
                height="450vh"
                allowFullScreen="on"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full rounded-2xl overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
