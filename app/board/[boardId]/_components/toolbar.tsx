"use client";

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { ToolButton } from './tool-button'
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from 'lucide-react'
import { CanvasMode, LayerType } from '@/lib/types/canvas.types'
import useCanvasStore from '@/store/canvas.store'
import { useCanRedo, useCanUndo, useHistory } from '@liveblocks/react'

interface IToolbarProps { }

function ToolBar({}: IToolbarProps) {
  const { undo, redo } = useHistory();
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()
  const { state, lastUsedColor, layerType, setCanvasState, setMode, setLayerType, setLastUsedColor } = useCanvasStore();

  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-3 text-sm flex flex-col gap-2'>
      <div className='rounded-md bg-white p-1.5 flex flex-col items-center shadow-md gap-2'>
        <ToolButton 
        label='Select'
        icon={MousePointer2}
        onClick={() => setMode(CanvasMode.None)}
        isActive={ 
          [
            CanvasMode.None,
            CanvasMode.Pressing,
            CanvasMode.SelectionNet,
            CanvasMode.Translating,
            CanvasMode.Resizing,
            undefined
          ].includes(state.mode)
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Text'
        icon={Type}
        onClick={() => {
          setCanvasState({ mode: CanvasMode.Inserting })
          setLayerType(LayerType.Text)
        }}
        isActive={
          state.mode == CanvasMode.Inserting && layerType == LayerType.Text
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Sticky Note'
        icon={StickyNote}
        onClick={() => {
          setCanvasState({ mode: CanvasMode.Inserting })
          setLayerType(LayerType.Note)
        }}
        isActive={
          state.mode == CanvasMode.Inserting && layerType == LayerType.Note
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Rectangle'
        icon={Square}
        onClick={() => {
          setCanvasState({ mode: CanvasMode.Inserting })
          setLayerType(LayerType.Rectangle)
        }}
        isActive={
          state.mode == CanvasMode.Inserting && layerType == LayerType.Rectangle
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Ellipse'
        icon={Circle}
        onClick={() => {
          setCanvasState({ mode: CanvasMode.Inserting })
          setLayerType(LayerType.Ellipse)
        }}
        isActive={
          state.mode == CanvasMode.Inserting && layerType == LayerType.Ellipse
        }
        isDisabled={false}
        />
        <ToolButton 
        label='Pen'
        icon={Pencil}
        onClick={() => {
          setCanvasState({ mode: CanvasMode.Pencil })
        }}
        isActive={
          state.mode == CanvasMode.Pencil
        }
        isDisabled={false}
        />
      </div>
      <div className='rounded-md bg-white p-1.5 flex flex-col items-center shadow-md gap-2'>
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
