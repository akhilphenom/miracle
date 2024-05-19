"use client";

import { Button } from "@/components/ui/button";
import { EmptyResult } from "./empty-result";
import { useAxios } from "@/lib/hooks/axios.hook";
import { useEffect, useState } from "react";
import { BoardCardItem, IBoardCardItemProps } from "./board-card";

interface BoardListProps {
    organizationId: string;
    query: {
        search?: string;
        favourites?: string;
    }
}

export const BoardList = ({
    organizationId,
    query
}: BoardListProps) => {
    const { fetchData: fetchBoardsData, loading: boardsLoading, response: boardsResponse } = useAxios();
    const { fetchData: fetchCreateBoardData, loading: boardCreating } = useAxios();
    const [boards, setBoards] = useState<any>(null);
    
    const onCreateBoard = async () => {
        await fetchCreateBoardData({
            url: 'miracle-organization/create-board',
            method: 'POST',
            params: { organizationId }
        })
        await getBoards();
    }

    const getBoards = async () => {
        await fetchBoardsData({
            url: 'miracle-organization/boards',
            method: 'GET',
            params: { organizationId }
        })
    }

    useEffect(() => {
        if(boardsResponse?.data?.length) {
            console.log(boardsResponse.data)
            setBoards(boardsResponse.data)
        }
    }, [boardsResponse])

    useEffect(() => {
        getBoards();
    }, [])

    if(boardsLoading) {
        return (
            <div className="w-full h-full align-top justify-center my-8">
                <h6 className=" text-muted-foreground text-sm">Loading...</h6>
            </div>
        )
    }

    if(!boards?.length) {
        return (
            <div className="w-full flex flex-col items-center p-4 justify-center">
                {
                    query.search ? <EmptyResult url={"./search.svg"} placeholder="Try searching for something else"/> :
                    query.favourites ?  <EmptyResult url={"./todo.svg"} placeholder="No favourites"/> :
                    <div className="flex justify-center flex-col items-center">
                        <EmptyResult url={"./todo.svg"} placeholder="Start by creating a board for your organization"/>
                        <div className="m-4">
                            <Button size={'lg'} variant={'secondary'} onClick={onCreateBoard} disabled={boardCreating}>
                                Create board
                            </Button>
                        </div>
                    </div>
                }
            </div>
        )
    }
    
    return (
        <div>
            { boards.map((board: IBoardCardItemProps) => <BoardCardItem {...board}/>)  }
        </div>
    )
}