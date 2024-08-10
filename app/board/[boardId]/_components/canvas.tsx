"use client"
import React from 'react'
import InfoComponent from './info'
import Participants from './participants'
import ToolBar from './toolbar'
import { useSelf } from '@liveblocks/react'
import { ILiveblocksUserInfo } from '@/liveblocks.config'

interface CanvasProps {
  boardId: string
}

function CanvasComponent ({
  boardId
}: CanvasProps) {
  const { name, avatar }: ILiveblocksUserInfo = useSelf(me => me.info) || { name: 'Anonymous', avatar: ''}
  console.log(name, avatar)
  return (
    <main className='h-full w-full bg-blue-50 touch-none'>
        <InfoComponent/>
        <Participants/>
        <ToolBar/>
    </main>
  )
}

export default CanvasComponent
