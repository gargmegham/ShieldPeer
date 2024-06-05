import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @description A utility function to merge Tailwind CSS classes with clsx
 * @param  {...any} inputs
 * @returns
 */
export function cn(...inputs: any[]) {
    return twMerge(clsx(inputs))
}
