"use client";

import { useSelectionBounds } from '@/lib/hooks/use-selection-bounds.hook';
import { LayerType, SIDE, XYWH } from '@/lib/types/canvas.types'
import usePanzoomTransform from '@/store/panzoom.store';
import { useSelf, useStorage } from '@liveblocks/react';
import React, { memo, useRef } from 'react'

interface ISelectionBoxProps {
    onResize: (corner: SIDE, initialBounds: XYWH) => void,
    scale: number
}

function SelectionBoxComponent ({
    onResize, scale
}: ISelectionBoxProps) {
    const ref = useRef<SVGRectElement>(null);
    const HANDLE_WIDTH = 8;
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
                            x={x - (HANDLE_WIDTH/(2*scale))}
                            y={y - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
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
