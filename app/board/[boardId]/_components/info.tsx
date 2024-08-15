"use client";

import Actions from '@/components/actions';
import { Hint } from '@/components/shared/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'
import { useBoardContext } from '@/providers/boards-provider';
import { useRenameModal } from '@/store/use-rename-modal';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'

interface InfoProps {
  boardId: string
}

function InfoComponent({
  boardId
}: InfoProps) {
  const { onOpen, isOpen } = useRenameModal()
  const { onDeleteBoard, boardDeleting, getBoard, boardLoading, board } : {
    board: any, onDeleteBoard: any, boardDeleting: boolean, getBoard: any, boardLoading: boolean
  } = useBoardContext()

  const onDelete = () => {
    onDeleteBoard(boardId)
  }

  const PipeSeperator = () => <div className='h-[20px] w-[1px] rounded-md mx-2 bg-slate-300'/>

  useEffect(() => {
    boardId && getBoard(boardId);
  }, [boardId, isOpen])
  
  return (
    <div className='shadow-md bg-[#2979FF] absolute top-3 px-3 py-2 left-3 text-sm rounded-md flex flex-row'>
      <Hint label='Go to boards' side={'bottom'} sideOffset={10} fontSize={10}>
        <Button variant={'boardActive'} className='p-0 h-fit' asChild>
          <Link href={'/'} className='pt-[2px]'>
            <Image src={'/logo-transparent-white.png'} height={60} width={60} alt='Miracle Logo'/>
          </Link>
        </Button>
      </Hint>
      {
        (!boardLoading && board) ? 
        <>
          <PipeSeperator/>
          <Hint label='Edit name' side={'bottom'} sideOffset={10} fontSize={10}>
            <Button variant={'board'} className='h-fit py-0 px-2' onClick={() => onOpen(board._id, board.title)}>
              <p className='text-[11px] text-white font-extralight'>{board?.title}</p>
            </Button>
          </Hint>
          <PipeSeperator/>
          <Actions
          _id={board._id}
          title={board.title}
          side={'bottom'}
          sideOffset={10}
          onBoardDelete={onDelete}
          >
              <button disabled={boardDeleting} onClick={e =>e.preventDefault()} className="p-0 outline-none">
                  <Menu className="text-white opacity-75 hover:opacity-100 transition-opacity" size={20}/>
              </button>
          </Actions>
        </>
        : null
      }
    </div>
  )
}
export const InfoSkeleton = () => (
  <div className='shadow-md bg-white absolute top-3 left-3 text-sm rounded-md w-[84px] h-[32.47px]'>
    <Skeleton className='h-full w-full bg-muted-foreground'/>
  </div>
)
export default InfoComponent
