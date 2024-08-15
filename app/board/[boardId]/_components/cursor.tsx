import { pickRandomColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

interface ICursorProps {
    connectionId: number,
}
export const Cursor = memo(({
    connectionId
}: ICursorProps) => {
    const { name } = useOther(connectionId, user => user.info)
    const cursor = useOther(connectionId, user => user.presence.cursor)
    const color = pickRandomColor();

    if(!cursor) {
        return null;
    }
    
    const { x, y } = cursor;

    console.log(x,y)

    return (
        <foreignObject
        style={{
            transform: `translateX${x}px translateY${y}px`
        }}
        height={50}
        width={50}
        className="relative drop-shadow-sm"
        >
            <MousePointer2
            className="h-5 w-5"
            style={{
                color,
                fill: color,
            }}
            />
        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'