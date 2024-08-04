import { Loader } from 'lucide-react'
import React from 'react'
import InfoComponent from './info'
import Participants from './participants'
import ToolBar from './toolbar'

function CanvasLoading() {
  return (
    <main className='h-full w-full bg-blue-50 touch-none flex items-center justify-center'>
        <Loader className='text-muted-foreground animate-spin h-6 w-6'/>
        <InfoComponent.Skeleton/>
        <Participants.Skeleton/>
        <ToolBar.Skeleton/>
    </main>
  )
}

export default CanvasLoading
