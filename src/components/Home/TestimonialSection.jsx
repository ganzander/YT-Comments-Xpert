"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "I purchased my new glasses from Shree Balaji Opticals, and the quality is outstanding. The staff was extremely helpful in helping me choose the perfect frame.",
    name: "Rajesh Gupta",
    title: "Customer",
    imageSrc:
      "https://images.unsplash.com/photo-1607081692245-419edffb5462?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGluZGlhbiUyMG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    quote:
      "The eye test service was quick and professional. They provided excellent advice on the right lenses for my eyesight. Highly recommend!",
    name: "Sneha Verma",
    title: "Customer",
    imageSrc:
      "https://images.unsplash.com/photo-1600544395530-69b40d0483ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhbiUyMG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    quote:
      "I was looking for stylish sunglasses, and Shree Balaji Opticals had the perfect collection. I found exactly what I wanted!",
    name: "Amit Shah",
    title: "Customer",
    imageSrc:
      "https://images.unsplash.com/photo-1577760960310-c49bbb09161e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGluZGlhbiUyMG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    quote:
      "The contact lenses I bought are very comfortable. I’ve tried different brands before, but these are by far the best.",
    name: "Neha Kapoor",
    title: "Customer",
    imageSrc:
      "https://images.unsplash.com/photo-1591980896142-4e36328411ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhbiUyMG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    quote:
      "Shree Balaji Opticals gave me great discounts on my new frames. I saved a lot and got high-quality glasses in return!",
    name: "Vikram Singh",
    title: "Customer",
    imageSrc:
      "https://images.unsplash.com/flagged/photo-1571366992968-15b65708ee76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGluZGlhbiUyMG1vZGVsc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function TestimonialSection() {
  return (
    <div className="h-screen overflow-x-hidden flex flex-col antialiased bg-[#eee] dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <p className="uppercase text-2xl md:text-5xl font-bold relative z-20 bg-clip-text text-black dark:text-white py-8">
        Testimonials
      </p>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
