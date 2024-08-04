"use client";

import React from 'react'
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from '@liveblocks/react';

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
    return (
        <LiveblocksProvider publicApiKey={"pk_dev_n-0mNZWF2tM4ywB-OURnL_JwatoLq4Wn8_cMNuEw_bRRxveODJEhkUkver7t8rnv"}>
            <RoomProvider id={roomId} initialPresence={{}}>
                <ClientSideSuspense fallback={fallback}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}

export default WhiteboardRoom
