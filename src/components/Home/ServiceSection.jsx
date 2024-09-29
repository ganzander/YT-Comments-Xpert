"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function ServiceSection() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full min-h-screen bg-[#eee] py-20 dark:bg-black">
      <h2 className="w-full uppercase text-center pl-4 text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        SERVICES
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height={500}
              width={500}
              className="md:w-1/2 md:h-1/2 h-full w-full object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Eyewear",
    title: "Explore our latest eyewear collection.",
    src: "https://images.unsplash.com/photo-1553194671-078621819afe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEV5ZXdlYXIlMjBtb2RlbHN8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
  {
    category: "Lenses",
    title: "Get the perfect lenses for your vision.",
    src: "https://images.unsplash.com/photo-1558254916-5f7e6fc7c33e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fEV5ZXdlYXIlMjBtb2RlbHN8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
  {
    category: "Sunglasses",
    title: "Stylish sunglasses for every occasion.",
    src: "https://images.unsplash.com/photo-1553632183-c17a0664a8b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fEV5ZXdlYXIlMjBtb2RlbHN8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
  {
    category: "Eye Tests",
    title: "Book a comprehensive eye test today.",
    src: "https://images.unsplash.com/photo-1559069994-41b136ee0e33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fEV5ZXdlYXIlMjBtb2RlbHN8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
  {
    category: "Contact Lenses",
    title: "Comfortable and clear contact lenses.",
    src: "https://images.unsplash.com/photo-1530834395125-2a7eb8848ac0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEV5ZXdlYXIlMjBtb2RlbHN8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
  {
    category: "Offers",
    title: "Special discounts on frames and lenses.",
    src: "https://images.unsplash.com/photo-1587069841489-397256e1683e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fEV5ZXdlYXIlMjBtb2RlbHN8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
  {
    category: "Accessories",
    title: "Explore our eyewear accessories.",
    src: "https://images.unsplash.com/photo-1557002666-513ca8eaa3c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fEV5ZXdlYXIlMjBtb2RlbHN8ZW58MHx8MHx8fDA%3D",
    content: <DummyContent />,
  },
];
