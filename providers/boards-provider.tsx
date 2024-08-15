"use client";

import { useAxios } from '@/lib/hooks/axios.hook';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

export type TBoardContext = {
    setOrganizationId: (_id: string) => void,
    board: null,
    boards: any
    boardLoading: boolean,
    boardsLoading: boolean,
    boardCreating: boolean,
    boardDeleting: boolean,
    refreshBoards: () => void,
    getBoard: (_id: string) => void,
    onCreateBoard: () => void,
    onDeleteBoard: (_id: string) => void
    toggleFavourite: (_id: string) => void
    setFavourites: (value: boolean) => void
    setSearch: (value: string) => void
}

const BoardContext = createContext({
    setOrganizationId: (_id: string) => {},
    board: null,
    boards: null,
    boardLoading: true,
    boardsLoading: true,
    boardCreating: true,
    boardDeleting: true,
    getBoard: (_id: string) => {},
    onCreateBoard: () => {},
    onDeleteBoard: (_id: string) => {},
    refreshBoards: () => {},
    toggleFavourite: (_id: string) => {},
    setFavourites: (value: boolean) => {},
    setSearch: (value: string) => {}
});

export const useBoardContext = () => {
    return useContext(BoardContext);
};

export default function BoardsProvider ({
    children
}: {
    children: React.ReactNode
}) {
    const [searchValue, setSearchValue] = useState('');
    const [favouritesOnly, setFavouritesOnly] = useState(false);
    const { fetchData: fetchBoardData, loading: boardLoading, response: boardResponse } = useAxios();
    const { fetchData: fetchBoardsData, loading: boardsLoading, response: boardsResponse } = useAxios();
    const { fetchData: fetchCreateBoardData, loading: boardCreating } = useAxios();
    const { fetchData: deleteBoardData, loading: boardDeleting } = useAxios();
    const { fetchData: toggleBoardFavourite } = useAxios();

    const placeholders = [].constructor(10).fill(0).map((_: number, index: number) => `./placeholders/${index + 1}.svg`)

    const [board, setBoard] = useState<any>(null);
    const [boards, setBoards] = useState<any>(null);
    const [organizationId, setOrganizationId] = useState<string>();

    const setOrganization = (_id: string) => {
        setOrganizationId(_id)
    }

    const getBoard = async (boardId: string) => {
        await fetchBoardData({
            url: 'miracle-organization/board',
            method: 'GET',
            params: { _id: boardId }
        })
    }

    const getBoards = async () => {
        await fetchBoardsData({
            url: 'miracle-organization/boards',
            method: 'GET',
            params: { organizationId, favouritesOnly, searchValue }
        })
    }

    const onCreateBoard = async () => {
        await fetchCreateBoardData({
            url: 'miracle-organization/create-board',
            method: 'POST',
            params: {
                organizationId,
                imageUrl: placeholders[Math.floor(Math.random() * placeholders.length)],
                favouritesOnly
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

    const toggleFavourite = async (boardId: string) => {
        await toggleBoardFavourite({
            url: 'miracle-organization/toggle-favourite',
            method: 'POST',
            params: { boardId }
        })
        await getBoards()
    }

    const setSearch = async (value: string) => {    
        setSearchValue(value)
    }

    const setFavourites = async (value: boolean) => {    
        setFavouritesOnly(value)
    }

    useEffect(() => {
        if (boardsResponse?.data?.length) {
            setBoards(boardsResponse.data);
        } else {
            setBoards([])
        }
    }, [boardsResponse])

    useEffect(() => {
        if (boardResponse?.data) {
            setBoard(boardResponse.data);
        } else {
            setBoard([])
        }
    }, [boardResponse])

    useEffect(() => {
        getBoards();
    }, [organizationId, favouritesOnly, searchValue])

    useEffect(() => {
        getBoards();
    }, [])

    return (
        <BoardContext.Provider
            value={{
                board,
                boards,
                boardLoading,
                boardsLoading,
                boardCreating,
                boardDeleting,
                onCreateBoard,
                getBoard,
                onDeleteBoard,
                refreshBoards: getBoards,
                setOrganizationId: setOrganization,
                toggleFavourite,
                setFavourites,
                setSearch
            }}
        >
            {children}
        </BoardContext.Provider>
    )
}
