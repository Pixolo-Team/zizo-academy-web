/** Validates email format */
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/** Function to validate phone number */
export function validatePhoneNumber(phoneNumber: string): boolean {
  const regex = /^[0-9]{10}$/;
  return regex.test(phoneNumber);
}
