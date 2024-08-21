import { shallow, useSelf, useStorage } from "@liveblocks/react";
import { Layer } from "../types/canvas.types"

const boundingBox = (layers: Layer[]) => {
    if(!layers.length) {
        return null;
    }
    const firstLayer = layers[0];

    let left = firstLayer.x;
    let right = firstLayer.x + firstLayer.width;
    let top = firstLayer.y;
    let bottom = firstLayer.y + firstLayer.height;

    for(let i = 1; i < layers.length; i++) {
        const { x, y, width, height } = layers[i];
        if(x < left) {
            left = x
        }
        if(x + width > right) {
            right = x + width
        }
        if(y<top) {
            top = y
        }
        if(y + height > bottom) {
            bottom = y + height
        }
    }
    return { x: left, y: top, width: right - left, height: bottom - top }
}

export const useSelectionBounds = () => {
    const selections = useSelf(me => me.presence.selection) ?? []
    return useStorage(root => {
        const selectedLayers = selections.map(layerId => root.layers.get(layerId)!).filter(Boolean)
        return boundingBox(selectedLayers)
    }, shallow)
}