import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
<<<<<<< HEAD
}
=======
}
>>>>>>> 0ddf930d (Implement Room List View)
