import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { ToolButton } from './tool-button'
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from 'lucide-react'
import { CanvasMode, CanvasState, LayerType } from '@/lib/types/canvas.types'

interface IToolbarProps {
  canvasState: CanvasState,
  setCanvasState: (newState: CanvasState) => void,
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

function ToolBar({
  canvasState, setCanvasState, undo, redo, canRedo, canUndo
}: IToolbarProps) {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-3 text-sm flex flex-col gap-2'>
      <div className='rounded-md bg-white p-1.5 flex flex-col items-center shadow-md'>
        <ToolButton 
        label='Select'
        icon={MousePointer2}
        onClick={() => setCanvasState({ mode: CanvasMode.None })}
        isActive={ 
          [
            CanvasMode.None,
            CanvasMode.Pressing,
            CanvasMode.SelectionNet,
            CanvasMode.Translating,
            CanvasMode.Resizing,
          ].includes(canvasState.mode)
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Text'
        icon={Type}
        onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text })}
        isActive={
          canvasState.mode == CanvasMode.Inserting && canvasState.layerType == LayerType.Text
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Sticky Note'
        icon={StickyNote}
        onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Note })}
        isActive={
          canvasState.mode == CanvasMode.Inserting && canvasState.layerType == LayerType.Note
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Rectangle'
        icon={Square}
        onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Rectangle })}
        isActive={
          canvasState.mode == CanvasMode.Inserting && canvasState.layerType == LayerType.Rectangle
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Ellipse'
        icon={Circle}
        onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Ellipse })}
        isActive={
          canvasState.mode == CanvasMode.Inserting && canvasState.layerType == LayerType.Ellipse
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Pen'
        icon={Pencil}
        onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
        isActive={
          canvasState.mode == CanvasMode.Pencil
        }
        isDisabled={false}
        />
      </div>
      <div className='rounded-md bg-white p-1.5 flex flex-col items-center shadow-md'>
        <ToolButton 
        label='Undo'
        icon={Undo2}
        onClick={undo}
        isActive={false}
        isDisabled={!canUndo}
        />
        <ToolButton 
        label='Redo'
        icon={Redo2}
        onClick={redo}
        isActive={false}
        isDisabled={!canRedo}
        />
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
