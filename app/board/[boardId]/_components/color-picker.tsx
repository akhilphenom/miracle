"use client";

import { getElementSize } from '@/lib/utils';
import useCanvasStore from '@/store/canvas.store';
import usePanzoomTransform from '@/store/panzoom.store';
import { useMutation, useSelf, useStorage } from '@liveblocks/react';
import React, { useEffect, useState } from 'react'
import { RgbaColorPicker } from "react-colorful";
import { Color } from '@/lib/types/canvas.types';

function ColorPickerComponent() {
    const selection = useSelf(me => me.presence.selection)!
    const layers = useStorage(root => root.layers)!;
    const { transform } = usePanzoomTransform()
    const { lastUsedColor, setLastUsedColor, state, showColorPicker } = useCanvasStore()
    const [dimensions, setDimensions] = useState<ReturnType<typeof getElementSize>>({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0
    })

    const updateColor = useMutation((
        { storage, setMyPresence, self },
        fill: Color
    ) => {
        setLastUsedColor(lastUsedColor)
        const liveLayers = storage.get('layers');
        const layer = liveLayers.get(self.presence.selection[0])!;
        layer.update({ fill })
    }, [layers])

    useEffect(() => {
        const el = document.getElementById('selection-toolbox')!
        el && setDimensions(getElementSize(el))
    }, [transform, selection, state])


    if(!showColorPicker || !selection?.[0]) {
        return null;
    }

    return (
        <div 
        style={{
            position: 'absolute',
            top: dimensions.top - 220,
            left: dimensions.left
        }}>
            <RgbaColorPicker color={lastUsedColor} onChange={updateColor} />
        </div>
    )
}

export const ColorPicker = (ColorPickerComponent)
