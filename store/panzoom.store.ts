import { create } from 'zustand';

type PanzoomState = {
    transform: {
        x: number,
        y: number,
        scale: number,
        angle: number,
    }
}

interface IPanzoomStore {
    transform: PanzoomState['transform'], 
    setScale: (scale: number) => void, 
    setCoordinates: (x: number, y: number) => void, 
    setAngle: (angle: number) => void, 
    updateTransform: (transform: PanzoomState['transform']) => void
}

const usePanzoomTransform = create<IPanzoomStore>((set) => ({
  transform: {
    x: 0,
    y: 0,
    scale: 1,
    angle: 0,
  },

  setScale: (newScale: number) => set((state: PanzoomState) => ({
    transform: { ...state.transform, scale: newScale }
  })),
  
  setCoordinates: (newX: number, newY: number) => set((state: PanzoomState) => ({
    transform: { ...state.transform, x: newX, y: newY }
  })),
  
  setAngle: (newAngle: number) => set((state: PanzoomState) => ({
    transform: { ...state.transform, angle: newAngle }
  })),

  updateTransform: ({ x, y, scale, angle }: PanzoomState['transform']) =>
    set((state: PanzoomState) => ({
      transform: {
        ...state.transform,
        x: x !== undefined ? x : state.transform.x,
        y: y !== undefined ? y : state.transform.y,
        scale: scale !== undefined ? scale : state.transform.scale,
        angle: angle !== undefined ? angle : state.transform.angle,
      },
    })),
}));

export default usePanzoomTransform;
