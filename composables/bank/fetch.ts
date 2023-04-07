import { Bank } from "@hennihaus/bamconfigbackend";

const BANKS_PATH = "/banks";
const STATISTICS_PATH = "/statistics";

export const useBanksFetch = async (stopLoading: boolean = false) => {
  const { data: banks, refresh: refreshBanks } = await useBaseFetch<Bank[]>(
    BANKS_PATH,
    { stopLoading }
  );

  const asyncActiveBanks = computed(() =>
    banks.value?.filter((bank) => bank.isAsync)?.filter((bank) => bank.isActive)
  );

  return {
    banks: computed(() => banks.value ?? []),
    asyncActiveBanks: computed(() => asyncActiveBanks.value ?? []),
    refreshBanks,
  };
};

export const useBankFetch = async (uuid: Ref<string>) => {
  const { t } = useBaseI18n();

  const message = ref("");

  const { data: bank } = await useBaseFetch<Bank>(
    `${BANKS_PATH}/${uuid.value}`,
    {
      watch: [uuid],
    }
  );

  const updateBank = async (update: Bank): Promise<void> => {
    const { data } = await useBaseFetch<Bank>(`${BANKS_PATH}/${update.uuid}`, {
      method: "PATCH",
      body: update,
    });
    bank.value = data.value;
    message.value = "";
  };

  const saveStatistics = async (bankId: string): Promise<void> => {
    await useBaseFetch<void>(`${STATISTICS_PATH}/${bankId}`, { method: "PUT" });
    message.value = t("bank.add-teams-success");
  };

  const deleteStatistics = async (bankId: string): Promise<void> => {
    await useBaseFetch<void>(`${STATISTICS_PATH}/${bankId}`, {
      method: "DELETE",
    });
    message.value = t("bank.remove-teams-success");
  };

  return {
    bank,
    message: readonly(message),
    updateBank,
    saveStatistics,
    deleteStatistics,
  };
};
