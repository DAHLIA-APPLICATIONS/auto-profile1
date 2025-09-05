export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Japanese phone number format (flexible)
  const phoneRegex = /^[\d\-\(\)\+\s]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

export const validatePostalCode = (postalCode: string): boolean => {
  // Japanese postal code format: 123-4567
  const postalRegex = /^\d{3}-?\d{4}$/;
  return postalRegex.test(postalCode);
};

export const getValidationWarnings = (profile: {
  email: string;
  phone: string;
  address: string;
}) => {
  const warnings: string[] = [];
  
  if (profile.email && !validateEmail(profile.email)) {
    warnings.push('メールアドレスの形式をご確認ください');
  }
  
  if (profile.phone && !validatePhone(profile.phone)) {
    warnings.push('電話番号の形式をご確認ください');
  }
  
  // Check if address contains postal code and validate it
  const postalMatch = profile.address.match(/(\d{3}-?\d{4})/);
  if (postalMatch && !validatePostalCode(postalMatch[1])) {
    warnings.push('郵便番号の形式をご確認ください');
  }
  
  return warnings;
};