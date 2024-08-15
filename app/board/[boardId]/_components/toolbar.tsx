import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function ToolBar() {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-3 text-sm flex flex-col gap-2'>
      <div className='rounded-md bg-white p-1.5 flex flex-col items-center shadow-md'>
        <div>Pencil</div>
        <div>Eraser</div>
        <div>Circle</div>
      </div>
      <div className='rounded-md bg-white p-1.5 flex flex-col items-center shadow-md'>
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  )
}

export const ToolBarSkeleton = () => (
  <div className='absolute top-[50%] -translate-y-[50%] left-3 text-sm flex flex-col gap-2 bg-white h-[360px] w-[50px]'>
    <Skeleton className='h-full w-full bg-muted-foreground'/>
  </div>
)

export default ToolBar
