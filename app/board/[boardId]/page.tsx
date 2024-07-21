import React from 'react'
import CanvasComponent from './_components/canvas'

interface BoardIDPageProps {
    params: {
        boardId: string
    }
}

function BoardIDPage({
    params: { boardId }
}: BoardIDPageProps) {
    return (
        <CanvasComponent boardId={boardId}/>
    )
}

export default BoardIDPage
