import usePanzoomTransform from "@/store/panzoom.store";
import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
interface ICursorProps {
    connectionId: number,
    color: string
}

export const Cursor = memo(({
    connectionId, color
}: ICursorProps) => {
    const { transform, setScale, setCoordinates, setAngle, updateTransform } = usePanzoomTransform()
    const { name } = useOther(connectionId, user => user.info)
    const cursor = useOther(connectionId, user => user.presence.cursor)
    const [svgScale, setSvgScale] = useState(transform.scale)
    const mousePointerRef = useRef<SVGElement | any>()

    if(!cursor) {
        return null;
    }
    
    const { x, y } = cursor;

    useEffect(() => {
        setSvgScale(transform.scale)
        mousePointerRef.current?.setAttribute('height', `${20/svgScale}`)
        mousePointerRef.current?.setAttribute('width', `${20/svgScale}`)
    }, [transform])

    return (
        <foreignObject
        style={{
            transform: `translateX${x}px translateY${y}px`,
        }}
        height={50/svgScale}
        width={50/svgScale}
        className="relative drop-shadow-sm"
        >
            <MousePointer2
            ref={mousePointerRef}
            style={{
                color,
                fill: color,
            }}
            />
        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'