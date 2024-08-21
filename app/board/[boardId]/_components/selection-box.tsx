"use client";

import { useSelectionBounds } from '@/lib/hooks/use-selection-bounds.hook';
import { LayerType, SIDE, XYWH } from '@/lib/types/canvas.types'
import usePanzoomTransform from '@/store/panzoom.store';
import { useSelf, useStorage } from '@liveblocks/react';
import React, { memo } from 'react'

interface ISelectionBoxProps {
    onResize: (corner: SIDE, initialBounds: XYWH) => void
}

function SelectionBoxComponent ({
    onResize
}: ISelectionBoxProps) {
    const { transform: { scale } } = usePanzoomTransform()
    const HANDLE_WIDTH = 8/scale;
    const layerId = useSelf(me => me.presence.selection.length == 1 ? me.presence.selection[0] : null)

    const showHandle = useStorage(root => root.layers.get(layerId as string)?.type != LayerType.Path);
    const bounds = useSelectionBounds();

    if(!bounds) {
        return null;
    }

    const { x, y, width, height } = bounds

    return (
        <foreignObject 
        x={x}
        y={y}
        height={height}
        width={width}
        >
            <div 
            className=' border-blue-500 border-2'
            style={{ height, width }}
            >
                
            </div>
        </foreignObject>
    )
}

export const SelectionBox = memo(SelectionBoxComponent)
