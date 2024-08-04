import React from 'react'
import CanvasComponent from './_components/canvas'
import WhiteboardRoom from '@/components/whiteboard-room'
import CanvasLoading from './_components/loading'

interface BoardIDPageProps {
    params: {
        boardId: string
    }
}

function BoardIDPage({
    params: { boardId }
}: BoardIDPageProps) {
    return (
        <WhiteboardRoom roomId={boardId} fallback={<CanvasLoading/>}>
            <CanvasComponent boardId={boardId}/>
        </WhiteboardRoom>
    )
}

export default BoardIDPage
