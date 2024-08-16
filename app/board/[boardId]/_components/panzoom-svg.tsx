"use client";

import React, { useCallback } from 'react'
import { PanZoom } from 'react-easy-panzoom'
import { CursorsPresence } from './cursors-presence'
import usePanzoomTransform from '@/store/panzoom.store'
import { useMutation, useStorage } from '@liveblocks/react'
import { CanvasMode, LayerType, Point } from '@/lib/types/canvas.types'
import useCanvasStore from '@/store/canvas.store'
import { v4 as uuid } from 'uuid';
import { LiveObject } from '@liveblocks/client'

interface IPanzoomSVGProps {
    width: number,
    height: number,
    maxLayers: number
}

type PanzoomState = {
    x: number, y: number, scale: number, angle: number
}

function PanzoomSVG({
    width,
    height,
    maxLayers
}: IPanzoomSVGProps) {
    const { state: canvasState, setCanvasState, setMode, setLayerType, setLastUsedColor } = useCanvasStore();
    const { transform, setScale, setCoordinates, setAngle, updateTransform } = usePanzoomTransform()

    const layerIds = useStorage(({ layerIds }) => layerIds)

    const insertLayer = useMutation((
      { storage, setMyPresence }, 
      layerType: LayerType.Ellipse | LayerType.Note | LayerType.Text | LayerType.Rectangle,
      position: Point
    ) => {
      const liveLayers = storage.get('layers')
      if(liveLayers.size >= maxLayers) {
        return;
      }
      const liveLayerIds = storage.get('layerIds')
      const layerId = uuid()
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: canvasState.lastUsedColor
      })
  
      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)
  
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setMode(CanvasMode.None)
    }, [canvasState.lastUsedColor])

    const getAbsoluteCoordinates = (e: React.PointerEvent): Point => {
        return {
            x: e.clientX-transform.x,
            y: e.clientY-transform.y
        }
    }

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        setMyPresence({ cursor: getAbsoluteCoordinates(e) })
    }, [transform.x, transform.y, transform.scale])

    const onPointerUp = useMutation((
        { setMyPresence }, 
        e: React.PointerEvent
    )=>{
        const point: Point = getAbsoluteCoordinates(e)
        if(canvasState.mode == CanvasMode.Inserting) {
            
        } else {
            setCanvasState({ mode: CanvasMode.None })
        }
    },[])
    
    const observeChanges = useCallback((e: PanzoomState) => {
        updateTransform(e)
    }, [height, width])

    return (
        <PanZoom
            boundaryRatioVertical={1}
            boundaryRatioHorizontal={1}
            enableBoundingBox
            maxZoom={2}
            minZoom={0.2}
            onStateChange={observeChanges}
        >
            <svg 
            onPointerMove={onPointerMove}
            style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}
            >
                <g>
                    <CursorsPresence/>
                </g>
            </svg>
        </PanZoom>
    )
}

export default PanzoomSVG
