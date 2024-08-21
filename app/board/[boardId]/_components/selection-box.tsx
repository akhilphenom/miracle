"use client";

import { useSelectionBounds } from '@/lib/hooks/use-selection-bounds.hook';
import { LayerType, SIDE, XYWH } from '@/lib/types/canvas.types'
import usePanzoomTransform from '@/store/panzoom.store';
import { useSelf, useStorage } from '@liveblocks/react';
import React, { memo, useRef } from 'react'

interface ISelectionBoxProps {
    onResize: (corner: SIDE, initialBounds: XYWH) => void
}

function SelectionBoxComponent ({
    onResize
}: ISelectionBoxProps) {
    const ref = useRef<SVGRectElement>(null);
    const { transform: { scale }, panPrevented, setPreventPan } = usePanzoomTransform()
    const HANDLE_WIDTH = 8/scale;
    const layerId = useSelf(me => me.presence.selection.length == 1 ? me.presence.selection[0] : null)

    const showHandle = useStorage(root => root.layers.get(layerId as string)?.type != LayerType.Path);
    const bounds = useSelectionBounds();

    if(!bounds) {
        return null;
    }

    const { x, y, width, height } = bounds

    return (
        <>
            <rect 
            ref={ref}
            className='stroke-blue-500'
            x={x}
            y={y}
            stroke={`${1/scale}px`}
            height={height}
            width={width}
            />
            {
                showHandle ? 
                    (
                        <>
                            <rect
                            className='stroke-1 stroke-blue-500 fill-white'
                            x={x - (HANDLE_WIDTH/2)}
                            y={y - (HANDLE_WIDTH/2)}
                            height={HANDLE_WIDTH}
                            width={HANDLE_WIDTH}
                            style={{ cursor: 'nwse-resize'}}
                            onPointerDown={(e) => {
                                e.preventDefault()
                            }}
                            onPointerUp={e => {
                            }}
                            />
                        </>
                    )
                : null
            }
        </>
    )
}

export const SelectionBox = memo(SelectionBoxComponent)
