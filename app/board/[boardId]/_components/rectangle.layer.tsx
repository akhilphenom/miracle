import { RectangleLayer } from '@/lib/types/canvas.types'
import usePanzoomTransform from '@/store/panzoom.store'
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
    const { transform: { scale } } = usePanzoomTransform();
    return (
        <foreignObject
        x={x}
        y={y}
        height={height}
        width={width}
        className="drop-shadow-sm"
        id={id}
        >
            <div 
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{
                height, width, 
                backgroundColor: `rgb(${r},${g},${b})`,
                borderWidth: 3/scale,
                borderColor: selectionColor
            }}>
            </div>
        </foreignObject>
    )
}

export const Rectangle = React.memo(RectangleComponent)
