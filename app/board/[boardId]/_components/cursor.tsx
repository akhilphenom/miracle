import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";
interface ICursorProps {
    connectionId: number,
    color: string,
    transform: { x: number, y: number, scale: number }
}

export const Cursor = memo(({
    connectionId, color, transform
}: ICursorProps) => {
    const { name } = useOther(connectionId, user => user.info)
    const cursor = useOther(connectionId, user => user.presence.cursor)
    const POINTER_SIZE = 25;

    if(!cursor) {
        return null;
    }
    
    const { x, y } = cursor;

    const getHeight = (POINTER_SIZE)/transform.scale + 100
    const getWidth = name ? (20+name.length*18)/transform.scale : POINTER_SIZE/transform.scale

    return (
        <foreignObject
        x={x}
        y={y}
        height={getHeight}
        width={getWidth}
        className="drop-shadow-sm"
        >
            <MousePointer2
            style={{
                color,
                fill: color,
                height: POINTER_SIZE/transform.scale,
                width: POINTER_SIZE/transform.scale,
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