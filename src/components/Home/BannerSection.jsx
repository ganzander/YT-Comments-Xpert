"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function BannerSection() {
  const carouselItems = [
    {
      id: 1,
      content: (
        <Image
          src="/banners/1.png"
          alt="anyname"
          width={9000}
          height={1000}
          className="object-cover h-full w-screen"
        />
      ),
    },
    {
      id: 2,
      content: (
        <Image
          src="/banners/2.png"
          alt="anyname"
          width={9000}
          height={1000}
          className="object-cover h-full w-screen"
        />
      ),
    },
    {
      id: 3,
      content: (
        <Image
          src="/banners/3.jpeg"
          alt="anyname"
          width={9000}
          height={1000}
          className="object-contain h-full w-screen"
        />
      ),
    },
    {
      id: 4,
      content: (
        <Image
          src="/banners/4.png"
          alt="anyname"
          width={9000}
          height={1000}
          className="object-contain h-full w-screen"
        />
      ),
    },
    {
      id: 5,
      content: (
        <Image
          src="/banners/5.png"
          alt="anyname"
          width={9000}
          height={1000}
          className="object-contain h-full w-screen"
        />
      ),
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-[#eee] pb-20 dark:bg-black mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center w-full h-full"
                >
                  {item.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-3 absolute left-0 right-0">
        <div className="flex items-center justify-center gap-3">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? " dark:bg-white bg-black scale-110"
                  : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
