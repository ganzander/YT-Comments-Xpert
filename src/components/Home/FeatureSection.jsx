"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export default function FeatureSection() {
  return (
    <div className="min-h-screen w-full bg-[#eee] py-20 dark:bg-black">
      <h2 className="w-full uppercase text-center pl-4 pb-20 text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Features
      </h2>
      <BentoGrid className="max-w-4xl mx-auto ">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = ({ imageSrc, title }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    <Image
      src={imageSrc}
      alt={title}
      height={500}
      width={500}
      className="w-full h-full object-cover"
    />
  </div>
);

const items = [
  {
    title: "Comprehensive Eye Exams",
    description:
      "Get a thorough eye health assessment and accurate prescription updates.",
    header: (
      <Skeleton
        imageSrc="https://images.unsplash.com/photo-1539036776273-021ec1d78bec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Comprehensive Eye Exams"
      />
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Lens Customization",
    description:
      "Choose from a wide range of lenses tailored to your vision needs.",
    header: (
      <Skeleton
        imageSrc="https://images.unsplash.com/photo-1582143434535-eba55a806718?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q29udGFjdCUyMExlbnN8ZW58MHx8MHx8fDA%3D"
        title="Lens Customization"
      />
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Designer Eyewear Collection",
    description: "Explore our stylish range of frames from top designers.",
    header: (
      <Skeleton
        imageSrc="https://images.unsplash.com/photo-1532920092365-f0ba59b286e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Designer Eyewear Collection"
      />
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contact Lens Fitting",
    description: "Find the perfect contact lenses for comfort and clarity.",
    header: (
      <Skeleton
        imageSrc="https://images.unsplash.com/photo-1659351423172-bb8d42079d6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29udGFjdCUyMExlbnN8ZW58MHx8MHx8fDA%3D"
        title="Contact Lens Fitting"
      />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sunglasses & UV Protection",
    description: "Protect your eyes with our range of UV-blocking sunglasses.",
    header: (
      <Skeleton
        imageSrc="https://images.unsplash.com/photo-1502767089025-6572583495f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN1bmdsYXNzZXMlMjAlMjYlMjBVViUyMFByb3RlY3Rpb258ZW58MHx8MHx8fDA%3D"
        title="Sunglasses & UV Protection"
      />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Repairs & Adjustments",
    description:
      "Keep your eyewear in perfect condition with our repair services.",
    header: (
      <Skeleton
        imageSrc="https://images.unsplash.com/photo-1501619838605-f3e4c602db04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXlld2VhciUyMHRvb2xzfGVufDB8fDB8fHww"
        title="Repairs & Adjustments"
      />
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Blue Light Protection Lenses",
    description:
      "Enhance your screen time comfort with lenses designed to block blue light.",
    header: (
      <Skeleton
        imageSrc="https://images.unsplash.com/photo-1565834325413-613e8b81f716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fFJlcGFpcnMlMjAlMjYlMjBBZGp1c3RtZW50cyUyMG9mJTIwZXlld2VhcnxlbnwwfHwwfHx8MA%3D%3D"
        title="Blue Light Protection Lenses"
      />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
