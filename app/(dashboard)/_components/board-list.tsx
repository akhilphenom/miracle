"use client";

import { Button } from "@/components/ui/button";
import { EmptyResult } from "./empty-result";
import { useEffect } from "react";
import { BoardCardItem, IBoardCardItemProps } from "./board-card";
import NewBoard from "./new-board";
import { TBoardContext, useBoardContext } from "@/providers/boards-provider";
import { Toggle } from "@/components/ui/toggle";
import Link from "next/link";
import { Star } from "lucide-react";

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
    const { 
        setOrganizationId,
        boards,
        boardsLoading, 
        boardCreating,
        onCreateBoard,
        boardDeleting,
        onDeleteBoard,
        refreshBoards,
        setFavourites
    } : TBoardContext = useBoardContext();

    const handleToggleFavourite = () => {
        if(query.favourites) {
            setFavourites(false)
        } else {
            setFavourites(true)
        }
    }

    useEffect(() => {
        setOrganizationId(organizationId);
    }, [organizationId])

    useEffect(() => {
        organizationId && refreshBoards()
    }, [])

    if(boardsLoading) {
        return (
            <div className="w-full h-full flex flex-col gap-3">
                <p className="text-3xl">{ query.favourites ? "Favourite Boards": "White Boards" }</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4
                flex-1 basis-0 min-h-0 overflow-auto">
                    <NewBoard onClick={onCreateBoard} disabled={boardCreating}/>
                    {
                        [].constructor(5).map((_: null, index: string) => <BoardCardItem.Skeleton key={index}/>)
                    }
                </div>
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
        <div className="w-full h-full flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
                <p className="text-3xl">{ query.favourites ? "Favourite Boards": "White Boards" }</p>
                <Toggle pressed={ query.favourites ? true : false }>
                    <Link href={{
                        pathname: '/', ...(!query.favourites? { query: { favourites: true } } : {})
                    }} 
                    onClick={handleToggleFavourite} 
                    className="flex flex-row items-center justify-center">
                        <Star className="mr-2 h-4"/>
                        Favourite Boards
                    </Link>
                </Toggle>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-4
            flex-1 basis-0 min-h-0 overflow-auto">
                <NewBoard key={'new-board'} onClick={onCreateBoard} disabled={boardCreating}/>
                { boards.map((board: IBoardCardItemProps) => <BoardCardItem key={board._id} {...board} disableEvents={boardDeleting} onBoardDelete={onDeleteBoard}/>)  }
            </div>
        </div>
    )
}