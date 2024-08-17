"use client";

import React, { useCallback, useMemo } from 'react'
import { PanZoom } from 'react-easy-panzoom'
import { CursorsPresence } from './cursors-presence'
import usePanzoomTransform from '@/store/panzoom.store'
import { useMutation, useOthersMapped, useStorage } from '@liveblocks/react'
import { CanvasMode, Point, ShapeLayerType } from '@/lib/types/canvas.types'
import useCanvasStore from '@/store/canvas.store'
import { v4 as uuid } from 'uuid';
import { LiveObject } from '@liveblocks/client'
import { Layer } from './layer';
import { pickRandomColor } from '@/lib/utils';

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
    const { state, lastUsedColor, layerType, setCanvasState, setMode, setLayerType, setLastUsedColor } = useCanvasStore();
    const { transform, setScale, setCoordinates, setAngle, panPrevented, setPreventPan, updateTransform } = usePanzoomTransform()

    const layerIds = useStorage(({ layerIds }) => layerIds) ?? []
    const selections = useOthersMapped(other => other.presence.selection)

    const insertLayer = useMutation((
      { storage, setMyPresence }, 
      layerType: ShapeLayerType,
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
        fill: lastUsedColor
      })
  
      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)
  
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setMode(CanvasMode.None)
    }, [lastUsedColor])

    const getAbsoluteCoordinates = (e: React.PointerEvent): Point => {
        return {
            x: (e.clientX - transform.x)/transform.scale,
            y: (e.clientY - transform.y)/transform.scale
        }
    }

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        setMyPresence({ cursor: getAbsoluteCoordinates(e) })
    }, [transform.x, transform.y, transform.scale])

    const onPointerUp = useMutation((
        { setMyPresence }, 
        e: React.PointerEvent
    )=>{
        if(state.mode == CanvasMode.Inserting) {
            insertLayer(layerType as ShapeLayerType, getAbsoluteCoordinates(e))
        } else {
            setCanvasState({ mode: CanvasMode.None })
        }
    }, [transform.x, transform.y, transform.scale, state, layerType, insertLayer])
    
    const observeChanges = useCallback((e: PanzoomState) => {
        updateTransform(e)
    }, [height, width])

    const getSelectionColor = useMemo(() => {
        const layerMap: {[key: string]: string} = {};
        for(const user of selections) {
            const [connectionId, selection] = user;
            for(const layerId of selection) {
                layerMap[layerId] = pickRandomColor(connectionId)
            }
        }
        return layerMap
    }, [selections])

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
            onPointerUp={onPointerUp}
            style={{ position: 'relative', width: `${width}px`, height: `${height}px` }}
            >
                <g>
                    {layerIds.map(layerId => (
                        <Layer
                        key={layerId}
                        id={layerId}
                        onLayerPointerDown={() => {}}
                        selectionColor={getSelectionColor[layerId]}
                        />
                    ))}
                    <CursorsPresence/>
                </g>
            </svg>
        </PanZoom>
    )
}

export default PanzoomSVG
