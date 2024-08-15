"use client";

import React from 'react'
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ConfirmationModal from './confirmation-modal';
import { Button } from './ui/button';
import { useRenameModal } from '@/store/use-rename-modal';

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps['side']
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    _id: string
    title: string,
    onBoardDelete: (_id: string) => void
}

export default function Actions({
    children, side, sideOffset, _id, title, onBoardDelete
}: ActionProps) {   
    const { onOpen } = useRenameModal();

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${_id}`
        ).then(() => toast.success('Copied link'))
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-[120px]'
                side={side}
                sideOffset={sideOffset}
                onClick={e => { e.stopPropagation() }}
            >
                <Button
                    key={1}
                    variant={'ghost'}
                    className='cursor-pointer px-3 py-1 w-full justify-start font-normal text-sm'
                    onClick={onCopyLink}
                >
                    <Link2 className='h-4 w-4 mr-2' />
                    <p className='text-xs'>Copy Link</p>
                </Button>
                <Button
                    key={2}
                    variant={'ghost'}
                    className='cursor-pointer px-3 py-1 w-full justify-start font-normal text-sm'
                    onClick={() => onOpen(_id, title)}
                >
                    <Pencil className='h-4 w-4 mr-2' />
                    <p className='text-xs'>Rename</p>
                </Button>
                <ConfirmationModal onConfirm={() => onBoardDelete(_id)} header='Delete board' description='Are you sure you want to delete this board?'>
                    <Button
                        key={3}
                        variant={'ghost'}
                        className='cursor-pointer px-3 py-1 w-full justify-start font-normal text-sm'
                    >
                        <div className='flex flex-row justify-center'>
                            <Trash2 className='h-4 w-4 mr-2' />
                            <p className='text-xs'>Delete</p>
                        </div>
                    </Button>
                </ConfirmationModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
