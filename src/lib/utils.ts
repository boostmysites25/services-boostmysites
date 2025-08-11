import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digit characters (+, spaces, hyphens, parentheses, etc.)
  return phone.replace(/\D/g, '');
}
