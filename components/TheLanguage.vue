<script setup lang="ts">
import { setLocale } from "@vee-validate/i18n";
import { Locales } from "~/plugins/1.i18n";

const { locale } = useBaseI18n();
const config = useRuntimeConfig();
const route = useRoute();

const locales: Record<string, string> = {
  de: "de",
  en: "gb uk",
};

const flag = computed(() => {
  const newFlag = Object.keys(locales).find(
    (language) => language !== locale.value
  );
  return locales[newFlag || config.public.locale];
});

const changeLanguage = async () => {
  const newLocale = Object.keys(locales).find(
    (language) => locales[language] === flag.value
  );

  locale.value = newLocale as Locales;
  setLocale(locale.value);

  await navigateTo({
    ...route,
    params: {
      ...route.params,
      locale: newLocale,
    },
  });
};
</script>

<template>
  <a class="item" @click="changeLanguage">
    <i class="flag custom" :class="[flag]" />
  </a>
</template>

<style scoped>
.custom {
  margin: 0 !important;
}
</style>
