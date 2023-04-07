import { setLocale } from "@vee-validate/i18n";

export default defineNuxtRouteMiddleware((to, _) => {
  const nuxtApp = useNuxtApp();

  const locale = to.params.locale as string;

  if (nuxtApp.$i18n.global.availableLocales.includes(locale)) {
    nuxtApp.$i18n.global.locale.value = locale;
    setLocale(locale);
    return true;
  }

  nuxtApp.$i18n.global.locale.value = nuxtApp.$i18n.global.fallbackLocale
    .value as string;
  setLocale(nuxtApp.$i18n.global.fallbackLocale.value as string);
  return navigateTo(
    {
      ...to,
      params: {
        ...to.params,
        locale: nuxtApp.$i18n.global.locale.value,
      },
    },
    {
      redirectCode: 301,
    }
  );
});
