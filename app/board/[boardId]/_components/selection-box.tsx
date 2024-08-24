"use client";

import { useSelectionBounds } from '@/lib/hooks/use-selection-bounds.hook';
import { LayerType, SIDE, XYWH } from '@/lib/types/canvas.types'
import { useSelf, useStorage } from '@liveblocks/react';
import React, { memo } from 'react'

interface ISelectionBoxProps {
    onResize: (corner: SIDE, initialBounds: XYWH) => void,
    scale: number
}

function SelectionBoxComponent ({
    onResize, scale
}: ISelectionBoxProps) {
    const HANDLE_WIDTH = 8;
    const layerId = useSelf(me => me.presence.selection.length == 1 ? me.presence.selection[0] : null)

    const showHandle = useStorage(root => root.layers.get(layerId as string)?.type != LayerType.Path);
    const bounds = useSelectionBounds();

    if(!bounds) {
        return null;
    }

    const { x, y, width, height } = bounds

    return (
        <g id={'selection-box'}>
            <rect 
            className='stroke-blue-500'
            x={x}
            y={y}
            stroke={`${2/scale}`}
            height={height}
            width={width}
            />
            {
                showHandle ? 
                    (
                        <>
                            <rect
                            className='stroke-blue-500 fill-white'
                            x={x - (HANDLE_WIDTH/(2*scale))}
                            y={y - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
                            stroke={`${2/scale}`}
                            style={{ cursor: 'nwse-resize'}}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResize(SIDE.top + SIDE.left, bounds)
                            }}
                            />
                            <rect
                            className='stroke-blue-500 fill-white'
                            x={x + (width/2) - (HANDLE_WIDTH/(2*scale))}
                            y={y - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
                            stroke={`${2/scale}`}
                            style={{ cursor: 'ns-resize'}}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResize(SIDE.top, bounds)
                            }}
                            />
                            <rect
                            className='stroke-blue-500 fill-white'
                            x={x + width - (HANDLE_WIDTH/(2*scale))}
                            y={y - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
                            stroke={`${2/scale}`}
                            style={{ cursor: 'nesw-resize'}}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResize(SIDE.top + SIDE.right, bounds)
                            }}
                            />
                            <rect
                            className='stroke-blue-500 fill-white'
                            x={x + width - (HANDLE_WIDTH/(2*scale))}
                            y={y + (height/2) - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
                            stroke={`${2/scale}`}
                            style={{ cursor: 'ew-resize'}}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResize(SIDE.right, bounds)
                            }}
                            />
                            <rect
                            className='stroke-blue-500 fill-white'
                            x={x + width - (HANDLE_WIDTH/(2*scale))}
                            y={y + height - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
                            stroke={`${2/scale}`}
                            style={{ cursor: 'nwse-resize'}}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResize(SIDE.bottom + SIDE.right, bounds)
                            }}
                            />
                            <rect
                            className='stroke-blue-500 fill-white'
                            x={x + (width/2) - (HANDLE_WIDTH/(2*scale))}
                            y={y + height - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
                            stroke={`${2/scale}`}
                            style={{ cursor: 'ns-resize'}}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResize(SIDE.bottom, bounds)
                            }}
                            />
                            <rect
                            className='stroke-blue-500 fill-white'
                            x={x - (HANDLE_WIDTH/(2*scale))}
                            y={y + height - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
                            stroke={`${2/scale}`}
                            style={{ cursor: 'nesw-resize'}}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResize(SIDE.bottom + SIDE.left, bounds)
                            }}
                            />
                            <rect
                            className='stroke-blue-500 fill-white'
                            x={x - (HANDLE_WIDTH/(2*scale))}
                            y={y + (height/2) - (HANDLE_WIDTH/(2*scale))}
                            height={HANDLE_WIDTH/scale}
                            width={HANDLE_WIDTH/scale}
                            stroke={`${2/scale}`}
                            style={{ cursor: 'ew-resize'}}
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onResize(SIDE.left, bounds)
                            }}
                            />
                        </>
                    )
                : null
            }
        </g>
    )
}

export const SelectionBox = memo(SelectionBoxComponent)
