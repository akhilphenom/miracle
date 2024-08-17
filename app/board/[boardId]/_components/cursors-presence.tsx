import { useOthersConnectionIds } from '@liveblocks/react'
import React, { memo } from 'react'
import { Cursor } from './cursor'
import { pickRandomColor } from '@/lib/utils'

const Cursors = () => {
    const connectionIds = useOthersConnectionIds()
    return (
        <>
            {connectionIds.map(connectionId => {
              const color = pickRandomColor(connectionId);
              return (
                <Cursor
                key={connectionId}
                connectionId={connectionId}
                color={color}
                />
              )
            })}
        </>
    )
}

export const CursorsPresence = memo(() => {
  return (
    <Cursors/>
  )
})