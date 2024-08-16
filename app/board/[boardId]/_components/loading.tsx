import { Loader } from 'lucide-react'
import React from 'react'
import { InfoSkeleton } from './info'
import { ToolBarSkeleton } from './toolbar'

function CanvasLoading() {
  return (
    <main className='h-full w-full bg-blue-50 touch-none flex items-center justify-center'>
        <Loader className='text-muted-foreground animate-spin h-6 w-6'/>
        <InfoSkeleton/>
        <ToolBarSkeleton/>
    </main>
  )
}

export default CanvasLoading
