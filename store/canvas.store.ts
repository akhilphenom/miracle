import { CanvasMode, CanvasState, Color, LayerType } from "@/lib/types/canvas.types"
import { create } from "zustand"

type ICanvasState = {
    state: CanvasState
    lastUsedColor: Color,
    layerType: LayerType
}

export interface ICanvasStore {
    state: Partial<CanvasState>, 
    lastUsedColor: Color,
    layerType: LayerType
    setMode: (mode: CanvasMode) => void, 
    setLastUsedColor: (color: Color) => void, 
    setLayerType: (layerType: LayerType) => void
    setCanvasState: (state: Partial<ICanvasState['state']>) => void,
}

const useCanvasStore = create<ICanvasStore>((set) => ({
    state: {
        mode: CanvasMode.None,
        origin: { x: 0, y: 0 },
        current: { x: 0, y: 0 },
        initialBounds: {
            x: 0,
            y: 0,
            height: 0,
            width: 0,
        },
        corner: 1
    },
    lastUsedColor: { r: 0, g: 0, b: 0 },
    layerType: LayerType.Rectangle,
    setMode: (mode: CanvasMode) => set((store: ICanvasStore) => ({ state: { ...store.state, mode } })),
    setLastUsedColor: (color: Color) => set((store: ICanvasStore) => ({ state: { ...store.state, lastUsedColor: color } })),
    setLayerType: (layerType: LayerType) => set((_: ICanvasStore) => ({ layerType })),
    setCanvasState: (newState: Partial<ICanvasState['state']>) => set((store: ICanvasStore) => ({ state: { ...newState } }))
}))

export default useCanvasStore;
