"use client"

import { LayerType } from '@/lib/types/canvas.types'
import { useStorage } from '@liveblocks/react'
import React, { memo } from 'react'
import { Rectangle } from './rectangle.layer'

interface ILayer {
    id: string,
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor: string
}

function LayerPreview({
    id, onLayerPointerDown, selectionColor
}: ILayer) {
    const layer = useStorage(root => root.layers.get(id))
    if(!layer) {
        return null
    }

    const { x, y, width, height, fill, type } = layer

    switch(type) {
        case LayerType.Rectangle:
            return (
                <Rectangle 
                id={id} 
                layer={{ type: LayerType.Rectangle, x, y, height, width, fill }} 
                onPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}
                />
            )
        default:
            console.log("Unknown layer type")
    }

    return (
        <div>

        </div>
    )
}

export const Layer = memo(LayerPreview)
