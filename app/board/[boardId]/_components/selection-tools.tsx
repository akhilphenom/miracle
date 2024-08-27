"use client";

import { useSelectionBounds } from '@/lib/hooks/use-selection-bounds.hook';
import { ICanvasStore } from '@/store/canvas.store'
import { useSelf } from '@liveblocks/react';
import React, { memo } from 'react'

interface ISelectionToolProps {
    transform: { x: number, y: number, scale: number };
    setLastUsedColor: ICanvasStore['setLastUsedColor']
    lastUsedColor: ICanvasStore['lastUsedColor']
}

function SelectionToolsComponent({
    transform: { x, y, scale }
}: ISelectionToolProps) {
    const selection = useSelf(me => me.presence.selection);
    const selectionBounds = useSelectionBounds();
    if(!selectionBounds) {
        return null;
    }

    const TOOLBOX_HEIGHT = 40
    const PADDING_HORIZONTAL = 8

    const height = TOOLBOX_HEIGHT/scale
    const width = selectionBounds.width/scale
    const absoluteX = selectionBounds.x - ((width - selectionBounds.width)/2)
    const absoluteY = selectionBounds.y - height - 16/scale

    return (
        <foreignObject 
        id='selection-toolbox'
        height={height}
        width={width} 
        x={absoluteX}
        y={absoluteY}
        >
            <div className='absolute bg-white shadow-sm border flex select-none'
            style={{
                height,
                width,
                borderRadius: 6/scale,
                paddingTop: 4/scale,
                paddingBottom: 4/scale,
                paddingLeft: PADDING_HORIZONTAL/scale,
                paddingRight: PADDING_HORIZONTAL/scale,
            }}>
                
            </div>
        </foreignObject>
    )
}

export const SelectionTools = memo(SelectionToolsComponent);

SelectionTools.displayName = 'Selection Tools'
