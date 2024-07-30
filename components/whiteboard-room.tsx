"use client";

import React from 'react'
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from '@liveblocks/react';

interface WhiteboardRoomProps {
    children?: React.ReactNode
    roomId: string
}

function WhiteboardRoom ({
    children,
    roomId
}: WhiteboardRoomProps) {
    return (
        <LiveblocksProvider publicApiKey={"pk_dev_n-0mNZWF2tM4ywB-OURnL_JwatoLq4Wn8_cMNuEw_bRRxveODJEhkUkver7t8rnv"}>
            <RoomProvider id={roomId} initialPresence={{}}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}

export default WhiteboardRoom
