import { RectangleLayer } from '@/lib/types/canvas.types'
import React from 'react'

interface IRectangleLayerProps {
    id: string,
    layer: RectangleLayer,
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

function RectangleComponent({
    id, layer: { x, y, height, width, fill: { r, g, b } }, onPointerDown, selectionColor
}: IRectangleLayerProps) {
    return (
        <foreignObject
        x={x}
        y={y}
        height={height}
        width={width}
        className="drop-shadow-sm">
            <div style={{
                height, width, backgroundColor: `rgb(${r},${g},${b})`
            }}>
            </div>
        </foreignObject>
    )
}

export const Rectangle = React.memo(RectangleComponent)
