import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function InfoComponent() {
  return (
    <div className='shadow-md bg-white absolute top-3 left-3 px-3 py-2 text-sm rounded-md'>
      Info
    </div>
  )
}
InfoComponent.Skeleton = () => (
  <div className='shadow-md bg-white absolute top-3 left-3 text-sm rounded-md w-[100px] h-[50px]'>
    <Skeleton className='h-full w-full bg-muted-foreground'/>
  </div>
)
export default InfoComponent
