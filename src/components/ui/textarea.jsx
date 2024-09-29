"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
      radial-gradient(
        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        var(--blue-500),
        transparent 80%
      )
    `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <textarea
        className={cn(
          `flex w-full border-none bg-[#eee] dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm resize-none
        placeholder:text-white-700 dark:placeholder:text-neutral-400 
        focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
        disabled:cursor-not-allowed disabled:opacity-50
        dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
        group-hover/input:shadow-none transition duration-400 h-20 md:h-24 lg:h-32`,
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
