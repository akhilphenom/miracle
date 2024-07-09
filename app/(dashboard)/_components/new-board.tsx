import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import React from 'react'

interface NewBoardButtonProps {
    onClick: () => void,
    disabled?: boolean
}

export default function NewBoard({
    disabled, onClick
}: NewBoardButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={
                cn(
                    'border border-slate-300 group-hover:bg-blue-800 rounded-lg flex flex-col aspect-[9/14] justify-center items-center bg-blue-600',
                    disabled && 'opacity-75 cursor-not-allowed hover:bg-blue-500'
                )
            }
        >
            <Plus className='h-12 w-12 relative text-white stroke-1'></Plus>
            <p className='text-sm text-white font-light'>New Board</p>
        </button>
    )
}
