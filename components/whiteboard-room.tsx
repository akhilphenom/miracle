"use client";

import React from 'react'
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from '@liveblocks/react';
import { useAxios } from '@/lib/hooks/axios.hook';

interface WhiteboardRoomProps {
    children?: React.ReactNode
    roomId: string,
    fallback: React.ReactNode
}

function WhiteboardRoom ({
    children,
    roomId,
    fallback
}: WhiteboardRoomProps) {
    const { fetchData, loading, response } = useAxios();
    
    const authEndpoint = async (room: any) => {
        await fetchData({
            url: 'liveblocks/miracle',
            method: 'POST',
            data: { room },
            params: { room },
        })
        return response?.success ? JSON.parse(response.data) : { token: undefined }
    };

    return (
        <LiveblocksProvider authEndpoint={authEndpoint}>
            <RoomProvider id={roomId} initialPresence={{}}>
            {
                response?.success ?
                <ClientSideSuspense fallback={fallback}>
                    {children}
                </ClientSideSuspense>
                : fallback
            }
                </RoomProvider> 
        </LiveblocksProvider>
    )
}

export default WhiteboardRoom
