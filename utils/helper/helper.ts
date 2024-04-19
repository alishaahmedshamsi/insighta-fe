import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

   // Convert image to base64
export const convertImage = async (file: File): Promise<string> => {
    const reader = new FileReader();
    await new Promise<void>((resolve, reject) => {
        reader.onload = () => {
            resolve();
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsDataURL(file);
    });

    return reader.result as string;
};