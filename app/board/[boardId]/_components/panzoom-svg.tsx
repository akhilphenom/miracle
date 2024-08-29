"use client";

import React, { useCallback, useMemo, useState } from 'react'
import { PanZoom } from 'react-easy-panzoom'
import { CursorsPresence } from './cursors-presence'
import usePanzoomTransform from '@/store/panzoom.store'
import { useHistory, useMutation, useOthersMapped, useStorage } from '@liveblocks/react'
import { CanvasMode, Point, ShapeLayerType, SIDE, XYWH } from '@/lib/types/canvas.types'
import useCanvasStore from '@/store/canvas.store'
import { v4 as uuid } from 'uuid';
import { LiveObject } from '@liveblocks/client'
import { Layer } from './layer';
import { pickRandomColor, resizeBounds, translateLayer } from '@/lib/utils';
import { SelectionBox } from './selection-box';
import { SelectionTools } from './selection-tools';

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
    const { state, lastUsedColor, layerType, setCanvasState, setMode, setLayerType, setLastUsedColor, setShowColorPicker, showColorPicker } = useCanvasStore();
    const { transform, setScale, setCoordinates, setAngle, panPrevented, setPreventPan, updateTransform } = usePanzoomTransform();

    const history = useHistory();
    const layerIds = useStorage(({ layerIds }) => layerIds) ?? []
    const selections = useOthersMapped(other => other.presence.selection)
    
    const [elementRefs, setElementRefs] = useState<HTMLElement[]>([])

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
    }, [lastUsedColor, setLastUsedColor])

    const resizeSelectedLayer = useMutation((
        { self, storage },
        point: Point
    ) => {
        if(state.mode != CanvasMode.Resizing) {
            return;
        }
        const bounds = resizeBounds(state.initialBounds!, state.corner!, point)
        const liveLayers = storage.get('layers');
        const layer = liveLayers.get(self.presence.selection[0]);
        layer && layer.update(bounds)
    }, [state, transform])

    const translateSelectedLayer = useMutation((
        { self, storage },
        point: Point
    ) => {
        if(state.mode != CanvasMode.Translating) {
            return;
        }
        const { deltaX, deltaY } = translateLayer(state.current!, point)
        const liveLayers = storage.get('layers');
        const layer = liveLayers.get(self.presence.selection[0])!;
        const bounds = {
            x: layer.get('x'),
            y: layer.get('y'),
            width: layer.get('width'),
            height: layer.get('height')
        }
        const translation = {
            x: bounds.x + deltaX,
            y: bounds.y + deltaY,
        }
        layer && layer.update({ ...translation })
        setCanvasState({ current: point, mode: CanvasMode.Translating })
    }, [state, transform])

    const togglePalette = useCallback(() => {
        showColorPicker ? history.pause() : history.resume();
        setShowColorPicker(!showColorPicker)
    }, [history, showColorPicker])

    const deleteLayer = useMutation((
        { setMyPresence, self, storage }
    ) => {
        history.resume()
        const layerId = self.presence.selection[0]
        layerId && storage.get('layers').delete(layerId)
        setMyPresence({ selection: [] }, { addToHistory: true })
    }, [history])

    const bringToFront = useMutation((
        { self, storage, setMyPresence }
    ) => {
        const selection = self.presence.selection;
        if(!selection?.length) {
            return;
        }
        const layerIds = storage.get('layerIds');
        const targets = []
        const layers = layerIds.toArray();
        for(let i=0; i<layers.length; i++) {
            if(selection.includes(layers[i])) {
                targets.push(i)
            }
        }
        for(let i=targets.length-1; i>=0; i--) {
            layerIds.move(targets[i], layers.length - i - 1)
        }
    }, [layerIds, state, transform])


    const sendToBack = useMutation((
        { self, storage, setMyPresence }
    ) => {
        const selection = self.presence.selection;
        if(!selection?.length) {
            return;
        }
        const layerIds = storage.get('layerIds');
        const targets = []
        const layers = layerIds.toArray();
        for(let i=0; i<layers.length; i++) {
            if(selection.includes(layers[i])) {
                targets.push(i)
            }
        }
        for(let i=0; i<targets.length; i++) {
            layerIds.move(targets[i], i)
        }
    }, [layerIds, state, transform])

    const getAbsoluteCoordinates = (e: React.PointerEvent): Point => {
        return {
            x: (e.clientX - transform.x)/transform.scale,
            y: (e.clientY - transform.y)/transform.scale
        }
    }

    const observeChanges = useCallback((e: PanzoomState) => {
        updateTransform(e)
    }, [height, width])

    const selectionResizeHandler = useCallback((corner: SIDE, initialBounds: XYWH) => {
        history.pause();
        setCanvasState({ mode: CanvasMode.Resizing, initialBounds, corner })
    }, [history])

    const panPrevention = useCallback((event: any, x: number, y: number) => {
        const possibleRefs = []
        for(const layerId of layerIds) {
            possibleRefs.push(document.getElementById(layerId)!)
        }
        possibleRefs.push(document.getElementById('selection-box')!)
        possibleRefs.push(document.getElementById('selection-toolbox')!)
        setElementRefs(possibleRefs.filter(Boolean))
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
    }, [transform, layerIds, resizeSelectedLayer, state])

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.stopPropagation()
        if (state.mode == CanvasMode.Translating) {
            translateSelectedLayer(getAbsoluteCoordinates(e))
        } else if (state.mode == CanvasMode.Resizing) {
            resizeSelectedLayer(getAbsoluteCoordinates(e))
        }
        setMyPresence({ cursor: getAbsoluteCoordinates(e) })
    }, [transform, state, resizeSelectedLayer])

    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string
    ) => {
        if([CanvasMode.Pencil, CanvasMode.Inserting].includes(state.mode!)) {
            return;
        }
        history.pause();
        e.stopPropagation();
        const point = getAbsoluteCoordinates(e);
        if(!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true })
        }
        setCanvasState({ current: point, mode: CanvasMode.Translating })
    }, [transform, state, layerIds, panPrevention])

    const onPointerUp = useMutation((
        { setMyPresence }, 
        e: React.PointerEvent
    )=>{
        if(state.mode == CanvasMode.Inserting) {
            insertLayer(layerType as ShapeLayerType, getAbsoluteCoordinates(e))
        } else {
            setCanvasState({ mode: CanvasMode.None })
            let clickedOutside = true
            for(const ref of elementRefs) {
                if(ref == e.target || ref.contains(e.target as Node)) {
                    clickedOutside = false;
                    break;
                }
            }
            if(clickedOutside) {
                setShowColorPicker(false)
                history.resume();
                setMyPresence({ selection: []}, { addToHistory: true })
            }
        }
        history.resume()
    }, [transform, state, layerType, insertLayer, panPrevention, panPrevented, elementRefs])

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
                        onLayerPointerDown={onLayerPointerDown}
                        selectionColor={getSelectionColor[layerId]}
                        />
                    ))}
                    <SelectionBox onResize={selectionResizeHandler} scale={transform.scale}/>
                </g>
                <g>
                    <CursorsPresence transform={transform}/>
                    <SelectionTools 
                    sendToBack={sendToBack}
                    bringToFront={bringToFront}
                    transform={transform} 
                    deleteLayer={deleteLayer} 
                    togglePalette={togglePalette}
                    />
                </g>
            </svg>
        </PanZoom>
    )
}

export default PanzoomSVG
