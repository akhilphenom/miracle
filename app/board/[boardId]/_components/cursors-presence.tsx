import { useOthersConnectionIds } from '@liveblocks/react'
import React, { memo } from 'react'
import { Cursor } from './cursor'
import { pickRandomColor } from '@/lib/utils'

interface ICursorProps {
  transform: { x: number, y: number, scale: number }
}

const Cursors = ({
  transform
}: ICursorProps) => {
    const connectionIds = useOthersConnectionIds()
    return (
        <>
            {connectionIds.map(connectionId => {
              const color = pickRandomColor(connectionId);
              return (
                <Cursor
                transform={transform}
                key={connectionId}
                connectionId={connectionId}
                color={color}
                />
              )
            })}
        </>
    )
}

export const CursorsPresence = memo(({
  transform
}: ICursorProps) => {
  return (
    <Cursors transform={transform}/>
  )
})

CursorsPresence.displayName = 'Cursor Presence'