"use client";

import { Button } from '@/components/ui/button';
import { useSelectionBounds } from '@/lib/hooks/use-selection-bounds.hook';
import { useSelf } from '@liveblocks/react';
import { Palette, Trash2 } from 'lucide-react';
import React, { memo } from 'react'

interface ISelectionToolProps {
    transform: { x: number, y: number, scale: number };
    togglePalette: () => void;
    deleteLayer: () => void
}

function SelectionToolsComponent({
    transform: { x, y, scale },
    togglePalette,
    deleteLayer
}: ISelectionToolProps) {
    const selection = useSelf(me => me.presence.selection);
    const selectionBounds = useSelectionBounds();
    if(!selection?.[0] || !selectionBounds) {
        return null;
    }

    const TOOLBOX_HEIGHT = 40
    const TOOLBOX_WIDTH = 200

    const height = TOOLBOX_HEIGHT/scale
    const width = TOOLBOX_WIDTH/scale
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
            <div 
            className='flex flex-row justify-center'
            style={{
                width, height
            }}>
                <div className='absolute bg-white shadow-sm border flex select-none items-center justify-end'
                style={{
                    gap: 4/scale,
                    height,
                    borderRadius: 6/scale,
                    paddingTop: 4/scale,
                    paddingBottom: 4/scale,
                }}>
                    <Button className='bg-white hover:bg-white text-black' onClick={togglePalette}>
                        <Palette size={18/scale} scale={scale}/>
                    </Button>
                    <Button className='bg-white hover:bg-white text-black' onClick={deleteLayer}>
                        <Trash2 size={18/scale}/>
                    </Button>
                </div>
            </div>
        </foreignObject>
    )
}

export const SelectionTools = memo(SelectionToolsComponent);

SelectionTools.displayName = 'Selection Tools'
