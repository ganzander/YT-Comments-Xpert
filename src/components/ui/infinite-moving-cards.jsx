"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction,
  speed,
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20 w-full overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="bg-white dark:bg-gray-900 w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 shadow-sm px-8 py-6 md:w-[450px] md:shadow-lg"
            key={item.name}
          >
            <blockquote>
              <div className="w-full flex items-center justify-center">
                <div className="relative w-[25vw] h-[25vw] sm:w-[15vw] sm:h-[15vw] md:w-[10vw] md:h-[10vw] overflow-hidden mb-4">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full w-full h-full"
                  />
                </div>
              </div>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>

              <div className="relative z-20 mt-6 flex flex-row items-center w-full">
                <span className="flex flex-col gap-1 text-center w-full">
                  <span className="text-sm leading-[1.6] text-black font-semibold dark:text-gray-400 ">
                    {item.name}
                  </span>
                  <span className=" text-sm leading-[1.6] text-black font-semibold dark:text-gray-400 ">
                    {item.title}
                  </span>
                </span>
              </div>
              <div className="w-full">
                <p className="relative text-center z-20 text-sm leading-[1.6] text-black font-semibold dark:text-[#FFF4EA]">
                  {item.quote}
                </p>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
