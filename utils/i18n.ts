import en from '~/app/data/translations/en.json';
import ar from '~/app/data/translations/ar.json';
import fr from '~/app/data/translations/fr.json';
import type { Locale } from '~/types';

const translations: Record<Locale, Record<string, string>> = { en, ar, fr };

export const availableLocales: { code: Locale; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
];

export function getLocale(): Locale {
  if (typeof localStorage === 'undefined') return 'en';
  return (localStorage.getItem('bazaar-locale') as Locale) || 'en';
}

export function setLocale(locale: Locale): void {
  localStorage.setItem('bazaar-locale', locale);
  const dir = getDir(locale);
  document.documentElement.setAttribute('lang', locale);
  document.documentElement.setAttribute('dir', dir);
  document.dispatchEvent(new CustomEvent('bazaar:locale-changed', { detail: { locale, dir } }));
}

export function getDir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function t(key: string, params?: Record<string, string | number>): string {
  const locale = getLocale();
  let value = translations[locale]?.[key] || translations.en[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, String(v));
    }
  }
  return value;
}
