import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Color, SIDE, XYWH } from "./types/canvas.types"
import { Point } from "framer-motion"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pickRandomColor = (connectionId?: number) => {
  const colors = ['#009FBD','#921A40', '#1F316F', '#674188', '#982B1C', '#00712D']
  if(connectionId) {
    return colors[connectionId%colors.length]
  }
  return colors[Math.floor(Math.random() * colors.length)];
}

export const RGBToHex = ({ r, g, b }: Color) => {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export const resizeBounds = (bounds: XYWH, corner: SIDE, point: Point): XYWH => {
  const result: XYWH = { ...bounds }
  const { x, y } = point;

  let quadrant: 1 | 2 | 3 | 4 = 4;

  let focalX = bounds.x
  let focalY = bounds.y;

  let lockAxis: 'x' | 'y' | null = null

  if(corner == SIDE.top + SIDE.left) {
    focalX = bounds.x + bounds.width;
    focalY = bounds.y + bounds.height
  } else if (corner == SIDE.top) {
    quadrant = 1
    lockAxis = 'y';
    focalY = bounds.y + bounds.height
  } else if (corner == SIDE.top + SIDE.right) {
    focalX = bounds.x;
    focalY = bounds.y + bounds.height
  } else if (corner == SIDE.right) {
    quadrant = 4
    lockAxis = 'x'
  } else if (corner == SIDE.bottom + SIDE.right) {
    focalX = bounds.x;
    focalY = bounds.y
  } else if (corner == SIDE.bottom) {
    quadrant = 3
    lockAxis = 'y';
  } else if (corner == SIDE.bottom + SIDE.left) {
    focalX = bounds.x + bounds.width;
    focalY = bounds.y
  } else if (corner == SIDE.left) {
    quadrant = 2
    lockAxis = 'x'
    focalX = bounds.x + bounds.width
  }

  if (x > focalX && y < focalY) {
    quadrant = 1;
  } else if ( x < focalX && y < focalY ) {
    quadrant = 2;
  } else if ( x < focalX && y > focalY ) {
    quadrant = 3;
  } else if ( x ) {
    quadrant = 4;
  }

  let newLeft = focalX;
  let newTop = focalY;

  const width = Math.abs(x - focalX)
  const height = Math.abs(y - focalY)
  if(quadrant == 1) {
    lockAxis != 'x' && (newTop = y);
  } else if (quadrant == 2) {
    lockAxis != 'x' && (newTop = y);
    lockAxis != 'y' && (newLeft = x);
  } else if (quadrant == 3) {
    lockAxis != 'y' && (newLeft = x);
    lockAxis != 'x' && (newTop = focalY);
  } else if (quadrant == 4) {
    lockAxis != 'y' && (newLeft = focalX);
    lockAxis != 'x' && (newTop = focalY);
  }

  result.x = newLeft;
  result.y = newTop;
  
  if(lockAxis == 'y') {
    result.height = height
  } else if(lockAxis == 'x') {
    result.width = width
  } else {
    result.width = width;
    result.height = height
  }

  return result;
}

export const translateLayer = (current: Point, movingCoordinates: Point) => {
  const deltaX = movingCoordinates.x - current.x;
  const deltaY = movingCoordinates.y - current.y;
  return { deltaX, deltaY }
}