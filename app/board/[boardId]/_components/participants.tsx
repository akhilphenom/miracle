"use client";

import { Skeleton } from '@/components/ui/skeleton'
import React, { useEffect, useState } from 'react'
import { AnimatedTooltip, IItem } from "@/components/ui/animated-tooltip";
import { useOthers, useSelf } from '@liveblocks/react';

function Participants() {
  const users = useOthers();
  const currentUser = useSelf();

  const [people, setPeople] = useState<IItem[]>([]);
  
  useEffect(() => {
    if(users?.length) {
      const people = users.slice(0, 5).map(({
        canWrite, canComment, connectionId, id, info: { name, avatar }, presence
      }) => ({ _id: id, name, avatar, designation: canWrite? 'Editor' : 'Viewer' }))
      setPeople(people)
    }
  }, [users])
  
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
