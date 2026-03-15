export default defineNuxtPlugin(() => {
  try {
    const theme = localStorage.getItem('bazaar-theme') ?? 'light';
    const locale = localStorage.getItem('bazaar-locale') ?? 'en';
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    if (theme === 'dark') document.documentElement.classList.add('dark');
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  } catch { /* ignore */ }
});
