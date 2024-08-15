"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type IAnimatedTooltipProps = {
  items: {
    _id: string;
    name: string;
    designation: string;
    avatar?: string;
  }[],
  height?: number,
  width?: number
}

export const AnimatedTooltip = ({ items, height, width }: IAnimatedTooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const pickRandomColor = () => {
    const colors = ['!bg-[#921A40]', '!bg-[#1F316F]', '!bg-[#674188]', '!bg-[#982B1C]', '!bg-[#00712D]']
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return colors[0];
  }

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="-mr-4  relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item._id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item._id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-8 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                <div className="font-bold text-white relative z-30 text-xs">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {
            item.avatar?.length ?
            <Image
            onMouseMove={handleMouseMove}
            height={40}
            width={40}
            src={item.avatar}
            alt={item.name}
            className={
              cn(
                "object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500",
                height && `h-[${height}px]`,
                width && `w-[${width}px]`,
              )
            }
            /> : 
            <div className={
              cn(
                "rounded-full h-14 w-[40px] border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500 flex items-center justify-center",
                height && `h-[${height}px]`,
                pickRandomColor()
              )
            }>
              <p className="text-white">{item.name?.charAt(0)}</p>
            </div>
          }
        </div>
      ))}
    </>
  );
};
