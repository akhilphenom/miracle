import usePanzoomTransform from "@/store/panzoom.store";
import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo, useEffect, useRef } from "react";
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
    const mousePointerRef = useRef<SVGElement | any>()
    const POINTER_SIZE = 25;

    if(!cursor) {
        return null;
    }
    
    const { x, y } = cursor;

    useEffect(() => {
        mousePointerRef.current?.setAttribute('height', `${POINTER_SIZE/transform.scale}`)
        mousePointerRef.current?.setAttribute('width', `${POINTER_SIZE/transform.scale}`)
    }, [transform])

    return (
        <foreignObject
        style={{
            transform: `translateX${x}px translateY${y}px`,
        }}
        height={POINTER_SIZE/transform.scale}
        width={POINTER_SIZE/transform.scale}
        className="absolute drop-shadow-sm"
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