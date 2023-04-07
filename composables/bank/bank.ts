import { Bank } from "@hennihaus/bamconfigbackend";
import { Ref } from "@vue/reactivity";

export const useBank = (bank: Ref<Bank>) => {
  const { t } = useBaseI18n();

  const activeStatus = computed(() =>
    bank.value.isActive
      ? t("bank.active-status", 1)
      : t("bank.active-status", 0)
  );

  const asyncStatus = computed(() =>
    bank.value.isAsync ? t("bank.async-status", 1) : t("bank.async-status", 0)
  );

  const isAsyncBankActive = computed(
    () => bank.value.isAsync && bank.value.isActive
  );

  const isAsyncBankNotActive = computed(
    () => bank.value.isAsync && !bank.value.isActive
  );

  const updatedAt = computed(() => new Date(bank.value.updatedAt));

  return {
    activeStatus,
    asyncStatus,
    isAsyncBankActive,
    isAsyncBankNotActive,
    updatedAt,
  };
};
