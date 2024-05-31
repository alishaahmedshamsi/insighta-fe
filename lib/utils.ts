import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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


export const capitalizeFirstLetter = (str: string | undefined | null): string => {
  if (!str) {
    return '';
  }
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};