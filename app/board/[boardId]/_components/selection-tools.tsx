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
    transform
}: ISelectionToolProps) {
    const selection = useSelf(me => me.presence.selection);
    const selectionBounds = useSelectionBounds();
    if(!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width
    return (
        <foreignObject width={selectionBounds.width} height={50/transform.scale}>
            <div className='absolute p-3 rounded-md bg-white shadow-sm border flex select-none'
            style={{
                top: selectionBounds.y,
                left: selectionBounds.x
            }}>
                
            </div>
        </foreignObject>
    )
}

export const SelectionTools = memo(SelectionToolsComponent);

SelectionTools.displayName = 'Selection Tools'
