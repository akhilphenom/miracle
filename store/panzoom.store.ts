import { create } from 'zustand';

type Transform = {
  x: number,
  y: number,
  scale: number,
  angle: number,
}

type PanzoomState = {
    transform: Transform,
    panPrevented: boolean,
    setPreventPan: (value: boolean) => void
}

interface IPanzoomStore {
    transform: Transform, 
    panPrevented: boolean,
    setPreventPan: PanzoomState['setPreventPan'],
    setScale: (scale: number) => void, 
    setCoordinates: (x: number, y: number) => void, 
    setAngle: (angle: number) => void, 
    updateTransform: (transform: Transform) => void
}

const usePanzoomTransform = create<IPanzoomStore>((set) => ({
  transform: {
    x: 0,
    y: 0,
    scale: 1,
    angle: 0,
  },
  panPrevented: false,

  setScale: (newScale: number) => set((state: IPanzoomStore) => ({
    transform: { ...state.transform, scale: newScale }
  })),
  
  setCoordinates: (newX: number, newY: number) => set((state: IPanzoomStore) => ({
    transform: { ...state.transform, x: newX, y: newY }
  })),
  
  setAngle: (newAngle: number) => set((state: IPanzoomStore) => ({
    transform: { ...state.transform, angle: newAngle }
  })),

  updateTransform: ({ x, y, scale, angle }: Transform) => set((state: IPanzoomStore) => ({
    transform: {
      ...state.transform,
      x: x !== undefined ? x : state.transform.x,
      y: y !== undefined ? y : state.transform.y,
      scale: scale !== undefined ? scale : state.transform.scale,
      angle: angle !== undefined ? angle : state.transform.angle,
    },
  })),

  setPreventPan: (preventPan: boolean) => set((_: IPanzoomStore) => ({ panPrevented: preventPan }))
}));

export default usePanzoomTransform;
