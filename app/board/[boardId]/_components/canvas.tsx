import React from 'react'
import InfoComponent from './info'
import Participants from './participants'
import ToolBar from './toolbar'
import PanzoomSVG from './panzoom-svg'

interface CanvasProps {
  boardId: string
}

function CanvasComponent ({
  boardId
}: CanvasProps) {
  const MAX_LAYERS = 150;
  const MAX_WIDTH = 100000;
  const MAX_HEIGHT = 100000;

  return (
    <main className='h-full w-full bg-blue-50 touch-none'>
        <PanzoomSVG width={MAX_WIDTH} height={MAX_HEIGHT} maxLayers={MAX_LAYERS}/>
        <InfoComponent boardId={boardId}/>
        <Participants/>
        <ToolBar/>
    </main>
  )
}

export default CanvasComponent
