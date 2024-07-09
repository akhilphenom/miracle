"use client";

import React, { FormEvent, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { useRenameModal } from '@/store/use-rename-modal'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAxios } from '@/lib/hooks/axios.hook';
import { toast } from 'sonner';
import { useBoardContext } from '@/providers/boards-provider';

export default function RenameModal() {
    const { fetchData: renameBoard, loading: renamingBoard } = useAxios();
    const { isOpen, onClose, initialValues } = useRenameModal();
    const { refreshBoards } = useBoardContext();
    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await renameBoard({
                url: 'miracle-organization/rename-board',
                method: 'POST',
                params: { _id: initialValues._id, title }
            })
            toast.success('Successfully updated');
            refreshBoards();
            onClose();
        } catch(err) {
            toast.error('Internal error')
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className='flex flex-col gap-3'>
                    <Input
                    required
                    disabled={renamingBoard}
                    maxLength={50}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Board title'
                    />
                    <DialogFooter>
                        <DialogClose>
                            <Button type={'button'} variant={'ghost'} className='text-xs'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type={'submit'} disabled={renamingBoard} className='text-xs'>
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
