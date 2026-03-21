export interface CountryCode {
  name: string;
  iso: string;
  code: string;    // e.g. "+91"
  digits: string;  // e.g. "91"
  minLength: number;
  maxLength: number;
}

export const COUNTRY_CODES: CountryCode[] = [
  { name: 'India', iso: 'in', code: '+91', digits: '91', minLength: 10, maxLength: 10 },
  { name: 'United States', iso: 'us', code: '+1', digits: '1', minLength: 10, maxLength: 10 },
  { name: 'United Kingdom', iso: 'gb', code: '+44', digits: '44', minLength: 10, maxLength: 10 },
  { name: 'Canada', iso: 'ca', code: '+1', digits: '1', minLength: 10, maxLength: 10 },
  { name: 'Australia', iso: 'au', code: '+61', digits: '61', minLength: 9, maxLength: 9 },
  { name: 'Germany', iso: 'de', code: '+49', digits: '49', minLength: 10, maxLength: 11 },
  { name: 'France', iso: 'fr', code: '+33', digits: '33', minLength: 9, maxLength: 9 },
  { name: 'Brazil', iso: 'br', code: '+55', digits: '55', minLength: 10, maxLength: 11 },
  { name: 'Mexico', iso: 'mx', code: '+52', digits: '52', minLength: 10, maxLength: 10 },
  { name: 'Pakistan', iso: 'pk', code: '+92', digits: '92', minLength: 10, maxLength: 10 },
  { name: 'Bangladesh', iso: 'bd', code: '+880', digits: '880', minLength: 10, maxLength: 10 },
  { name: 'Nepal', iso: 'np', code: '+977', digits: '977', minLength: 10, maxLength: 10 },
  { name: 'Sri Lanka', iso: 'lk', code: '+94', digits: '94', minLength: 9, maxLength: 9 },
  { name: 'UAE', iso: 'ae', code: '+971', digits: '971', minLength: 9, maxLength: 9 },
  { name: 'Saudi Arabia', iso: 'sa', code: '+966', digits: '966', minLength: 9, maxLength: 9 },
  { name: 'Singapore', iso: 'sg', code: '+65', digits: '65', minLength: 8, maxLength: 8 },
  { name: 'Malaysia', iso: 'my', code: '+60', digits: '60', minLength: 9, maxLength: 10 },
  { name: 'Indonesia', iso: 'id', code: '+62', digits: '62', minLength: 9, maxLength: 12 },
  { name: 'Philippines', iso: 'ph', code: '+63', digits: '63', minLength: 10, maxLength: 10 },
  { name: 'Nigeria', iso: 'ng', code: '+234', digits: '234', minLength: 10, maxLength: 10 },
  { name: 'South Africa', iso: 'za', code: '+27', digits: '27', minLength: 9, maxLength: 9 },
  { name: 'Kenya', iso: 'ke', code: '+254', digits: '254', minLength: 9, maxLength: 9 },
  { name: 'Egypt', iso: 'eg', code: '+20', digits: '20', minLength: 10, maxLength: 10 },
  { name: 'Turkey', iso: 'tr', code: '+90', digits: '90', minLength: 10, maxLength: 10 },
  { name: 'Italy', iso: 'it', code: '+39', digits: '39', minLength: 9, maxLength: 11 },
  { name: 'Spain', iso: 'es', code: '+34', digits: '34', minLength: 9, maxLength: 9 },
  { name: 'Netherlands', iso: 'nl', code: '+31', digits: '31', minLength: 9, maxLength: 9 },
  { name: 'Russia', iso: 'ru', code: '+7', digits: '7', minLength: 10, maxLength: 10 },
  { name: 'Japan', iso: 'jp', code: '+81', digits: '81', minLength: 10, maxLength: 11 },
  { name: 'China', iso: 'cn', code: '+86', digits: '86', minLength: 11, maxLength: 11 },
  { name: 'South Korea', iso: 'kr', code: '+82', digits: '82', minLength: 9, maxLength: 10 },
  { name: 'Thailand', iso: 'th', code: '+66', digits: '66', minLength: 9, maxLength: 9 },
  { name: 'Vietnam', iso: 'vn', code: '+84', digits: '84', minLength: 9, maxLength: 10 },
  { name: 'Argentina', iso: 'ar', code: '+54', digits: '54', minLength: 10, maxLength: 10 },
  { name: 'Colombia', iso: 'co', code: '+57', digits: '57', minLength: 10, maxLength: 10 },
];

export const DEFAULT_COUNTRY = COUNTRY_CODES[0]; // India

export function validatePhoneNumber(number: string, country: CountryCode): { valid: boolean; message: string } {
  const digits = number.replace(/\D/g, '');
  if (!digits) return { valid: false, message: '' };
  if (digits.length < country.minLength) {
    return {
      valid: false,
      message: `${country.name} numbers need ${country.minLength === country.maxLength ? country.minLength : `${country.minLength}–${country.maxLength}`} digits. You entered ${digits.length}.`,
    };
  }
  if (digits.length > country.maxLength) {
    return {
      valid: false,
      message: `${country.name} numbers need ${country.minLength === country.maxLength ? country.minLength : `${country.minLength}–${country.maxLength}`} digits. You entered ${digits.length}.`,
    };
  }
  return { valid: true, message: '' };
}
