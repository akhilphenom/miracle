"use client";

import { useAxios } from '@/lib/hooks/axios.hook';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

export type TBoardContext = {
    setOrganizationId: (_id: string) => void,
    boards: any
    boardsLoading: boolean,
    boardCreating: boolean,
    boardDeleting: boolean,
    refreshBoards: () => void,
    onCreateBoard: () => void,
    onDeleteBoard: (_id: string) => void
}

const BoardContext = createContext({
    setOrganizationId: (_id: string) => {},
    boards: null,
    boardsLoading: true,
    boardCreating: true,
    boardDeleting: true,
    onCreateBoard: () => {},
    onDeleteBoard: (_id: string) => {},
    refreshBoards: () => {},
});

export const useBoardContext = () => {
    return useContext(BoardContext);
};

export default function BoardsProvider ({
    children
}: {
    children: React.ReactNode
}) {
    const { fetchData: fetchBoardsData, loading: boardsLoading, response: boardsResponse } = useAxios();
    const { fetchData: fetchCreateBoardData, loading: boardCreating } = useAxios();
    const { fetchData: deleteBoardData, loading: boardDeleting } = useAxios();

    const placeholders = [].constructor(10).fill(0).map((_: number, index: number) => `./placeholders/${index + 1}.svg`)

    const [boards, setBoards] = useState<any>(null);
    const [organizationId, setOrganizationId] = useState<string>();

    const setOrganization = (_id: string) => {
        setOrganizationId(_id)
    }

    const getBoards = async () => {
        await fetchBoardsData({
            url: 'miracle-organization/boards',
            method: 'GET',
            params: { organizationId }
        })
    }

    const onCreateBoard = async () => {
        await fetchCreateBoardData({
            url: 'miracle-organization/create-board',
            method: 'POST',
            params: {
                organizationId,
                imageUrl: placeholders[Math.floor(Math.random() * placeholders.length)]
            }
        })
        toast.success('Board created!')
        await getBoards();
    }

    const onDeleteBoard = async (boardId: string) => {
        await deleteBoardData({
            url: 'miracle-organization/delete-board',
            method: 'POST',
            params: { boardId }
        })
        toast.success('Board deleted!')
        await getBoards()
    }

    useEffect(() => {
        if (boardsResponse?.data?.length) {
            setBoards(boardsResponse.data);
        } else {
            setBoards([])
        }
    }, [boardsResponse])

    useEffect(() => {
        getBoards();
    }, [organizationId])

    return (
        <BoardContext.Provider
            value={{
                boards,
                boardsLoading,
                boardCreating,
                boardDeleting,
                onCreateBoard,
                onDeleteBoard,
                refreshBoards: getBoards,
                setOrganizationId: setOrganization,
            }}
        >
            {children}
        </BoardContext.Provider>
    )
}
