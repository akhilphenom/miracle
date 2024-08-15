import React from 'react'
import CanvasComponent from './_components/canvas'
import WhiteboardRoom from '@/components/whiteboard-room'
import CanvasLoading from './_components/loading'
import { ModalProvider } from '@/providers/modal-provider'
import BoardsProvider from '@/providers/boards-provider'

interface BoardIDPageProps {
    params: {
        boardId: string
    }
}

function BoardIDPage({
    params: { boardId }
}: BoardIDPageProps) {
    return (
        <BoardsProvider>
            <WhiteboardRoom roomId={boardId} fallback={<CanvasLoading/>}>
                <CanvasComponent boardId={boardId}/>
                <ModalProvider/>
            </WhiteboardRoom>
        </BoardsProvider>
    )
}

export default BoardIDPage
