import { createI18n } from "vue-i18n";
import de from "../locales/de.json";
import en from "../locales/en.json";

export type MessageSchema = typeof de;

export type NumberSchema = {
  currency: {
    style: "currency";
    currency: "EUR";
    notation: "standard";
  };
  percent: {
    style: "percent";
    minimumFractionDigits: 2;
    maximumFractionDigits: 2;
  };
};

export type DateTimeSchema = {
  long: {
    year: "numeric";
    month: "numeric";
    day: "numeric";
    hour: "2-digit";
    minute: "2-digit";
    timeZoneName: "short";
  };
};

export type Locales = "de" | "en";

const currency: NumberSchema = {
  currency: {
    style: "currency",
    currency: "EUR",
    notation: "standard",
  },
  percent: {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
};

const dateTime: DateTimeSchema = {
  long: {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  },
};

const numberFormats = {
  de: {
    ...currency,
  },
  en: {
    ...currency,
  },
};

const datetimeFormats = {
  de: {
    ...dateTime,
  },
  en: {
    ...dateTime,
  },
};

export default defineNuxtPlugin(({ vueApp }) => {
  const config = useRuntimeConfig();

  const i18n = createI18n<[MessageSchema], Locales, false>({
    locale: config.public.locale,
    fallbackLocale: config.public.fallbackLocale,
    legacy: false,
    globalInjection: true,
    messages: {
      de,
      en,
    },
    numberFormats,
    datetimeFormats,
  });

  vueApp.use(i18n);

  return {
    provide: {
      i18n,
    },
  };
});
