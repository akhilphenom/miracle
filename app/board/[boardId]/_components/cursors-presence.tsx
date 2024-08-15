import { useOthersConnectionIds } from '@liveblocks/react'
import React, { memo } from 'react'
import { Cursor } from './cursor'

const Cursors = () => {
    const connectionIds = useOthersConnectionIds()
    console.log(connectionIds)
    return (
        <>
            {connectionIds.map(connectionId => (
                <Cursor
                key={connectionId}
                connectionId={connectionId}
                />
            ))}
        </>
    )
}

export const CursorsPresence = memo(() => {
  return (
    <div>
      <Cursors/>
    </div>
  )
})