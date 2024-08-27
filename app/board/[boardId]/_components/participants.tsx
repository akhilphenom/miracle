"use client";

import React, { useEffect, useState } from 'react'
import { AnimatedTooltip, IItem } from "@/components/ui/animated-tooltip";
import { useOthers, useSelf } from '@liveblocks/react';

export const MAX_USERS = 5;
function Participants() {
  const users = useOthers();
  const currentUser = useSelf();

  const [people, setPeople] = useState<IItem[]>([]);
  
  useEffect(() => {
    if(users?.length) {
      const people = users.slice(0, MAX_USERS).map(({
        canWrite, canComment, connectionId, id, info: { name, avatar }, presence
      }) => ({ _id: id, name, avatar, designation: canWrite? 'Editor' : 'Viewer' }))
      if(currentUser) {
        const {canWrite, canComment, connectionId, id, info: { name, avatar }, presence} = currentUser
        people.push({ _id: id, name: `${name} (You)`, avatar, designation: canWrite? 'Editor' : 'Viewer' })
      }
      if(users.length>MAX_USERS) {
        people.push({ _id: '#', name: `${users.length - MAX_USERS}`, avatar: '', designation: '' })
      }
      setPeople(people)
    }
  }, [users, currentUser])
  
  return (
    <div className='absolute bottom-3 right-[50%] translate-x-1/2'>
      <div className="flex flex-row items-center justify-center w-full">
        <AnimatedTooltip items={people} height={40} width={40} />
      </div>
    </div>
  )
}
export default Participants
