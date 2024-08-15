"use client";

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useOthers, useSelf } from '@liveblocks/react';

const people = [
  {
    _id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
];

function Participants() {
  const {} = useOthers();

  return (
    <div className='absolute bottom-3 right-[50%] translate-x-1/2'>
      <div className="flex flex-row items-center justify-center w-full">
        <AnimatedTooltip items={people} height={40} width={40} />
      </div>
    </div>
  )
}
export const ParticipantsSkeleton = () => (
  <div className='shadow-md bg-white absolute top-3 right-3 text-sm rounded-md w-[300px] h-[40px]'>
    <Skeleton className='h-full w-full bg-muted-foreground'/>
  </div>
)
export default Participants
