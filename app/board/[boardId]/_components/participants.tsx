import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Participants() {
  return (
    <div className='shadow-md bg-white absolute top-3 right-3 px-3 py-2 text-sm rounded-md'>
      Participants
    </div>
  )
}
export const ParticipantsSkeleton = () => (
  <div className='shadow-md bg-white absolute top-3 right-3 text-sm rounded-md w-[300px] h-[40px]'>
    <Skeleton className='h-full w-full bg-muted-foreground'/>
  </div>
)
export default Participants
