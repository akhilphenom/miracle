"use client"; //not a server component, its a serverside rendering

import RenameModal from '@/components/modals/rename-modal';
import React, { useEffect, useState } from 'react'

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // when it reaches client;
    useEffect(() => {
        setIsMounted(true);
    }, []) 
    
    if(!isMounted) {
        return null;
    }

    return (
        <RenameModal />
    )
}
