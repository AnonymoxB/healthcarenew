import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown): unknown =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File): string => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (
  dateString: Date | string,
  locale: string = "en-US"
) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null; // Tangani tanggal yang tidak valid

  const options = {
    dateTime: { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true },
    dateDay: { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" },
    dateOnly: { month: "short", year: "numeric", day: "numeric" },
    timeOnly: { hour: "numeric", minute: "numeric", hour12: true },
  } as const;

  return {
    dateTime: date.toLocaleString(locale, options.dateTime),
    dateDay: date.toLocaleString(locale, options.dateDay),
    dateOnly: date.toLocaleString(locale, options.dateOnly),
    timeOnly: date.toLocaleString(locale, options.timeOnly),
  };
};

export function encryptKey(passkey: string): string {
  return btoa(passkey);
}

export function decryptKey(passkey: string): string {
  return atob(passkey);
}
