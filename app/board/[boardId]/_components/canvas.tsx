import React from 'react'
import InfoComponent from './info'
import Participants from './participants'
import ToolBar from './toolbar'
import PanzoomSVG from './panzoom-svg'
import { ColorPicker } from './color-picker'

interface CanvasProps {
  boardId: string
}

function CanvasComponent ({
  boardId
}: CanvasProps) {
  const MAX_LAYERS = 100;
  const MAX_WIDTH = 10000;
  const MAX_HEIGHT = 10000;

  return (
    <main className='h-full w-full bg-blue-50 touch-none overflow-hidden'>
        <PanzoomSVG width={MAX_WIDTH} height={MAX_HEIGHT} maxLayers={MAX_LAYERS}/>
        <ColorPicker/>
        <InfoComponent boardId={boardId}/>
        <Participants/>
        <ToolBar/>
    </main>
  )
}

export default CanvasComponent
