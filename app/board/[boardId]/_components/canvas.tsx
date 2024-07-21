"use client"
import React from 'react'
import InfoComponent from './info'
import Participants from './participants'
import ToolBar from './toolbar'

interface CanvasProps {
  boardId: string
}

function CanvasComponent ({
  boardId
}: CanvasProps) {
  return (
    <main className='h-full w-full bg-blue-50 touch-none'>
        <InfoComponent/>
        <Participants/>
        <ToolBar/>
    </main>
  )
}

export default CanvasComponent
