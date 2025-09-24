import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to mask email for basic users
export function maskEmail(email: string, userRole: string): string {
  if (userRole === 'pro') {
    return email;
  }
  
  // For basic users, mask the email
  if (!email || email.length < 3) return email;
  
  const [localPart, domain] = email.split('@');
  if (!domain) return email;
  
  // Keep first 3 characters of local part, mask the rest
  const maskedLocal = localPart.length > 3 
    ? localPart.substring(0, 3) + 'x'.repeat(localPart.length - 3)
    : localPart;
  
  return `${maskedLocal}@${domain}`;
}

// Utility function to mask phone number for basic users
export function maskPhone(phone: string, userRole: string): string {
  if (userRole === 'pro') {
    return phone;
  }
  
  // For basic users, mask the phone number
  if (!phone || phone.length < 4) return phone;
  
  // Keep first 2 digits and last 2 digits, mask the middle
  const firstTwo = phone.substring(0, 2);
  const lastTwo = phone.substring(phone.length - 2);
  const middleLength = phone.length - 4;
  
  if (middleLength <= 0) return phone;
  
  const maskedMiddle = 'x'.repeat(middleLength);
  return `${firstTwo}${maskedMiddle}${lastTwo}`;
}
