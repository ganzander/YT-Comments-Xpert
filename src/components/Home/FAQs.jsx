"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQs() {
  return (
    <div className="relative overflow-hidden overflow-x-hidden dark:bg-grid-white/[0.05] bg-[#eee] text-black dark:bg-black dark:text-white antialiased min-h-screen w-full flex flex-col justify-center items-center">
      <p className="text-center text-2xl md:text-5xl font-bold relative z-20 bg-clip-text text-black dark:text-white py-8">
        FAQs
      </p>
      <Accordion
        type="single"
        collapsible
        className="w-full text-center max-w-4xl mx-auto dark:bg-transparent"
      >
        <AccordionItem
          value="item-1"
          className="bg-white dark:bg-transparent p-2 shadow-lg"
        >
          <AccordionTrigger className="text-sm md:text-xl text-left">
            What services does Shree Balaji Opticals offer?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-xl text-left">
            We provide a range of optical services including eye exams,
            prescription glasses, sunglasses, contact lenses, and vision care
            consultations.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="bg-white dark:bg-transparent p-2 shadow-lg"
        >
          <AccordionTrigger className="text-sm md:text-xl text-left">
            How often should I get my eyes tested?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-xl text-left">
            It is recommended to have an eye examination every 1-2 years, or
            sooner if you experience any vision changes or discomfort.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="bg-white dark:bg-transparent p-2 shadow-lg"
        >
          <AccordionTrigger className="text-sm md:text-xl text-left">
            Do you offer custom lenses and frames?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-xl text-left">
            Yes, we offer a variety of custom lens options including anti-glare,
            blue light filtering, and progressive lenses, as well as a wide
            range of frames to suit all styles and budgets.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-4"
          className="bg-white dark:bg-transparent p-2 shadow-lg"
        >
          <AccordionTrigger className="text-sm md:text-xl text-left">
            Do you provide home delivery of eyeglasses or contact lenses?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-xl text-left">
            Yes, we offer home delivery services for eyeglasses and contact
            lenses. Please contact us for details and delivery options.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-5"
          className="bg-white dark:bg-transparent p-2 shadow-lg"
        >
          <AccordionTrigger className="text-sm md:text-xl text-left">
            Can I get my old frames fitted with new lenses?
          </AccordionTrigger>
          <AccordionContent className="text-sm md:text-xl text-left">
            Absolutely! You can bring in your existing frames, and we’ll help
            you get new lenses fitted according to your updated prescription.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
