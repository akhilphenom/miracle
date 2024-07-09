import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import React from 'react'

interface BoardFooterProps {
    title: string,
    authorLabel: string,
    createdAtLabel: string,
    isFavourite: boolean,
    onClick: () => void,
    disabled: boolean
}

const Details = (
    { text }: { text: string }
) => {
    return (
        <p className='opacity-0 group-hover:opacity-100 text-muted-foreground truncate transition-opacity text-[0.7rem]'>
            {text}
        </p>
    )
}

export default function BoardFooter({
    title, authorLabel, createdAtLabel, isFavourite, onClick, disabled
} : BoardFooterProps) {
  return (
    <div className='p-3 relative'>
      <div className=' flex flex-row items-center justify-between gap-1'>
        <p className='truncate text-[0.8rem]'>
            {title}
        </p>
        <button 
        disabled={disabled}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
        className={
            cn(
                'opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-amber-600',
                disabled && 'cursor-not-allowed opacity-75'
            )
        }
        >
            <Star className={
                cn(
                    'h-4 w-4',
                    isFavourite && 'fill-amber-300 text-amber-300'
                )
            }/>
        </button>
      </div>
      <Details text={`${authorLabel}, ${createdAtLabel}`}/>
    </div>
  )
}
