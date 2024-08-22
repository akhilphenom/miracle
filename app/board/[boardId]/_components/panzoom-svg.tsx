"use client";

import React, { useCallback, useMemo, useRef } from 'react'
import { PanZoom } from 'react-easy-panzoom'
import { CursorsPresence } from './cursors-presence'
import usePanzoomTransform from '@/store/panzoom.store'
import { useHistory, useMutation, useOthersMapped, useStorage } from '@liveblocks/react'
import { CanvasMode, Point, ShapeLayerType } from '@/lib/types/canvas.types'
import useCanvasStore from '@/store/canvas.store'
import { v4 as uuid } from 'uuid';
import { LiveObject } from '@liveblocks/client'
import { Layer } from './layer';
import { pickRandomColor } from '@/lib/utils';
import { SelectionBox } from './selection-box';

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
    const { transform, setScale, setCoordinates, setAngle, panPrevented, setPreventPan, updateTransform } = usePanzoomTransform();

    const history = useHistory();
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
        history.resume()
    }, [transform.x, transform.y, transform.scale, state, layerType, insertLayer])

    const onPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string
    ) => {
        if([CanvasMode.Pencil, CanvasMode.Inserting, undefined].includes(state.mode)) {
            return;
        }
        history.pause();
        e.stopPropagation();
        const point = getAbsoluteCoordinates(e);
        if(!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true })
        }
        setCanvasState({ current: point, mode: CanvasMode.Translating })
    }, [state, transform])
    
    const observeChanges = useCallback((e: PanzoomState) => {
        updateTransform(e)
    }, [height, width])

    const selectionResizeHandler = () => {

    }

    const panPrevention = useCallback((event: any, x: number, y: number) => {
        const possibleRefs = []
        for(const layerId of layerIds) {
            possibleRefs.push(document.getElementById(layerId)!)
        }
        
        for(const ref of possibleRefs.filter(Boolean)) {
            if (event.target === ref) {
                setPreventPan(true)
                return true
            }  
    
            const contentRect = ref.getBoundingClientRect()
            
            const x1 = contentRect.left
            const x2 = contentRect.right
            const y1 = contentRect.top
            const y2 = contentRect.bottom
            
            const preventPan = (x >= x1 && x <= x2) && (y >= y1 && y <= y2);
            if(preventPan) {
                setPreventPan(preventPan)
                return preventPan
            }
        }
        return false;
    }, [transform, layerIds])

    const getSelectionColor = useMemo(() => {
        const layerMap: {[key: string]: string} = {};
        for(const user of selections) {
            const [connectionId, selection] = user;
            for(const layerId of selection) {
                layerMap[layerId] = pickRandomColor(connectionId)
            }
        }
        return layerMap
    }, [selections, state])

    return (
        <PanZoom
            boundaryRatioVertical={1}
            boundaryRatioHorizontal={1}
            enableBoundingBox
            maxZoom={2}
            minZoom={0.2}
            onStateChange={observeChanges}
            preventPan={panPrevention}
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
                        onLayerPointerDown={onPointerDown}
                        selectionColor={getSelectionColor[layerId]}
                        />
                    ))}
                    <SelectionBox onResize={selectionResizeHandler} scale={transform.scale}/>
                </g>
                <g>
                    <CursorsPresence/>
                </g>
            </svg>
        </PanZoom>
    )
}

export default PanzoomSVG
