"use client";

import { Button } from "@/components/ui/button";
import { EmptyResult } from "./empty-result";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

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
    const data = [];
    const { getToken } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken()
                const response = await fetch('http://localhost:3000/api/clerk/test-endpoint', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                })

                const result = await response.json()
            } catch (err) { }
        }

        fetchData()
    }, [getToken])
    if(!data?.length) {
        return (
            <div className="w-full flex flex-col items-center p-4 justify-center">
                {
                    query.search ? <EmptyResult url={"./search.svg"} placeholder="Try searching for something else"/> :
                    query.favourites ?  <EmptyResult url={"./todo.svg"} placeholder="No favourites"/> :
                    <div className="flex justify-center flex-col items-center">
                        <EmptyResult url={"./todo.svg"} placeholder="Start by creating a board for your organization"/>
                        <div className="m-4">
                            <Button size={'lg'} variant={'secondary'}>
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
            
        </div>
    )
}