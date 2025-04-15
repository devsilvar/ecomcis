import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(inputs);
}

export const getInitials = (value) =>
  value
    .split(" ")
    .map((word) => word.substring(0, 1))
    .join("");

export const isJwtExpired = (token) => {
  if (typeof token !== "string" || !token)
    throw new Error("Invalid token provided");

  let isJwtExpired = false;
  const { exp } = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;

  if (currentTime > exp) isJwtExpired = true;

  return isJwtExpired;
};

export const capitalize = (value) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
