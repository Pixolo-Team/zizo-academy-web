/** Function to validate phone number */
export function validatePhoneNumber(phoneNumber: string): boolean {
  const regex = /^[0-9]{10}$/;
  return regex.test(phoneNumber);
}
