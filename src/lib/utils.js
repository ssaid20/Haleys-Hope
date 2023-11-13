import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" }); // Abbreviated month name
    const day = date.getDate().toString().padStart(2, "0"); // Two-digit day
  
    return `${year}/${month}/${day}`;
  };