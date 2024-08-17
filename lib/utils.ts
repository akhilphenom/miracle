import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Color } from "./types/canvas.types"

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