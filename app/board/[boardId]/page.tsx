import React from 'react'
import CanvasComponent from './_components/canvas'
import WhiteboardRoom from '@/components/whiteboard-room'

interface BoardIDPageProps {
    params: {
        boardId: string
    }
}

function BoardIDPage({
    params: { boardId }
}: BoardIDPageProps) {
    return (
        <WhiteboardRoom roomId={boardId}>
            <CanvasComponent boardId={boardId}/>
        </WhiteboardRoom>
    )
}

export default BoardIDPage
