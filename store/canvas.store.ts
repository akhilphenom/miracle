import { CanvasMode, Color, LayerType } from "@/lib/types/canvas.types"
import { create } from "zustand"

type ICanvasState = {
    state: {
        mode: CanvasMode,
        lastUsedColor: Color,
        layerType: LayerType
    }
}

interface ICanvasStore {
    state: ICanvasState['state'], 
    setMode: (mode: CanvasMode) => void, 
    setLastUsedColor: (color: Color) => void, 
    setLayerType: (layerType: LayerType) => void
    setCanvasState: (state: Partial<ICanvasState['state']>) => void,
}

const useCanvasStore = create<ICanvasStore>((set) => ({
    state: {
        mode: CanvasMode.None,
        lastUsedColor: { r: 0, g: 0, b: 0 },
        layerType: LayerType.Rectangle
    },
    setMode: (mode: CanvasMode) => set((store: ICanvasStore) => ({ state: { ...store.state, mode } })),
    setLastUsedColor: (color: Color) => set((store: ICanvasStore) => ({ state: { ...store.state, lastUsedColor: color } })),
    setLayerType: (layerType: LayerType) => set((store: ICanvasStore) => ({ state: { ...store.state, layerType } })),
    setCanvasState: (newState: Partial<ICanvasState['state']>) => set((store: ICanvasStore) => ({ state: { ...store.state, ...newState } }))
}))

export default useCanvasStore;
