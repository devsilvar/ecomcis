import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(inputs);
}

export const getInitials = (value) =>
  value
    .split(" ")
    .map((word) => word.substring(0, 1))
    .join("");
