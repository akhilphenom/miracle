import { cn } from "@/lib/utils";
import usePanzoomTransform from "@/store/panzoom.store";
import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo, useCallback, useEffect, useRef } from "react";
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

    const getHeight = (POINTER_SIZE)/transform.scale + 100
    const getWidth = name ? (20+name.length*18)/transform.scale : POINTER_SIZE/transform.scale

    useEffect(() => {
        mousePointerRef.current?.setAttribute('height', `${POINTER_SIZE/transform.scale}`)
        mousePointerRef.current?.setAttribute('width', `${POINTER_SIZE/transform.scale}`)
    }, [transform])

    return (
        <foreignObject
        x={x/transform.scale}
        y={y/transform.scale}
        height={getHeight}
        width={getWidth}
        className="drop-shadow-sm"
        >
            <MousePointer2
            ref={mousePointerRef}
            style={{
                color,
                fill: color,
            }}/>
            <div 
            className="text-white shadow-md px-1.5 absolute whitespace-nowrap"
            style={{ 
                backgroundColor: color,
                left: 18/transform.scale,
                paddingLeft: 6/transform.scale,
                paddingRight: 6/transform.scale,
                fontSize: 14/transform.scale,
                borderRadius: 8/transform.scale
            }}>
                {name}
            </div>
        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'