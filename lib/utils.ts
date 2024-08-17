import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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