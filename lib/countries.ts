/* ═══════════════════════════════════════════════════════════════
   Timezone → Country mapping (covers 40+ common timezones)
   ═══════════════════════════════════════════════════════════════ */
export const TIMEZONE_COUNTRY_MAP: Record<string, { code: string; name: string; dial: string; flag: string }> = {
  'Africa/Cairo': { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
  'Africa/Casablanca': { code: 'MA', name: 'Morocco', dial: '+212', flag: '🇲🇦' },
  'Africa/Algiers': { code: 'DZ', name: 'Algeria', dial: '+213', flag: '🇩🇿' },
  'Africa/Tunis': { code: 'TN', name: 'Tunisia', dial: '+216', flag: '🇹🇳' },
  'Africa/Tripoli': { code: 'LY', name: 'Libya', dial: '+218', flag: '🇱🇾' },
  'Africa/Khartoum': { code: 'SD', name: 'Sudan', dial: '+249', flag: '🇸🇩' },
  'Asia/Riyadh': { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
  'Asia/Dubai': { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' },
  'Asia/Qatar': { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦' },
  'Asia/Kuwait': { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼' },
  'Asia/Bahrain': { code: 'BH', name: 'Bahrain', dial: '+973', flag: '🇧🇭' },
  'Asia/Muscat': { code: 'OM', name: 'Oman', dial: '+968', flag: '🇴🇲' },
  'Asia/Amman': { code: 'JO', name: 'Jordan', dial: '+962', flag: '🇯🇴' },
  'Asia/Beirut': { code: 'LB', name: 'Lebanon', dial: '+961', flag: '🇱🇧' },
  'Asia/Baghdad': { code: 'IQ', name: 'Iraq', dial: '+964', flag: '🇮🇶' },
  'Asia/Damascus': { code: 'SY', name: 'Syria', dial: '+963', flag: '🇸🇾' },
  'Asia/Gaza': { code: 'PS', name: 'Palestine', dial: '+970', flag: '🇵🇸' },
  'Asia/Hebron': { code: 'PS', name: 'Palestine', dial: '+970', flag: '🇵🇸' },
  'Asia/Istanbul': { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
  'Asia/Karachi': { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
  'Asia/Kolkata': { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  'Asia/Dhaka': { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  'Asia/Jakarta': { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
  'Asia/Kuala_Lumpur': { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  'Europe/London': { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  'Europe/Paris': { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  'Europe/Berlin': { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  'Europe/Brussels': { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
  'Europe/Amsterdam': { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  'Europe/Rome': { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  'Europe/Madrid': { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  'Europe/Stockholm': { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
  'America/New_York': { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  'America/Chicago': { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  'America/Denver': { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  'America/Los_Angeles': { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  'America/Toronto': { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  'America/Sao_Paulo': { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  'Australia/Sydney': { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
};

export const DEFAULT_COUNTRY = { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' };

export function detectCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_COUNTRY_MAP[tz] || DEFAULT_COUNTRY;
  } catch {
    return DEFAULT_COUNTRY;
  }
}
