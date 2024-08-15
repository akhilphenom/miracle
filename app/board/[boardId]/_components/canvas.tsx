"use client"

import React, { useState } from 'react'
import InfoComponent from './info'
import Participants from './participants'
import ToolBar from './toolbar'
import { CanvasMode, CanvasState } from '@/lib/types/canvas.types'
import { useCanRedo, useCanUndo, useHistory } from '@liveblocks/react'
import { CursorsPresence } from './cursors-presence'

interface CanvasProps {
  boardId: string
}

function CanvasComponent ({
  boardId
}: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,

  })

  const { undo, redo } = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className='h-full w-full bg-blue-50 touch-none'>
        <InfoComponent boardId={boardId}/>
        <Participants/>
        <ToolBar 
        canvasState={canvasState} 
        setCanvasState={setCanvasState} 
        canRedo={canRedo} canUndo={canUndo} 
        undo={undo} redo={redo}
        />
        <svg className='h-[100vh] w-[100vw]'>
          <g>
            <CursorsPresence/>
          </g>
        </svg>
    </main>
  )
}

export default CanvasComponent
