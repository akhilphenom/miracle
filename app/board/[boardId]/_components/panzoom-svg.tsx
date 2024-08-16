import React, { useCallback } from 'react'
import { PanZoom } from 'react-easy-panzoom'
import { CursorsPresence } from './cursors-presence'
import usePanzoomTransform from '@/store/panzoom.store'

interface IPanzoomSVGProps {
    width: number,
    height: number,
}

type PanzoomState = {
    x: number, y: number, scale: number, angle: number
}

function PanzoomSVG({
    width,
    height,
}: IPanzoomSVGProps) {
    const { transform, setScale, setCoordinates, setAngle, updateTransform } = usePanzoomTransform()

    const observeChanges = useCallback((e: PanzoomState) => {
        updateTransform(e)
    }, [height, width])

    return (
        <PanZoom
            boundaryRatioVertical={1}
            boundaryRatioHorizontal={1}
            enableBoundingBox
            maxZoom={2}
            minZoom={0.2}
            onStateChange={observeChanges}
        >
            <svg style={{
                width: `${width}px`, height: `${height}px`
            }}>
                <g>
                    <CursorsPresence/>
                </g>
            </svg>
        </PanZoom>
    )
}

export default PanzoomSVG
