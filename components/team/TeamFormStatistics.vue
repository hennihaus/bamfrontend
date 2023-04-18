<script setup lang="ts">
import { Statistics } from "~/utils/models";
import { Translation } from "vue-i18n";

const ZERO_REQUESTS = 0;

const team = inject(TEAM, null);
const banks = inject(BANKS, () => ref([]), true);

const { value: statistics, handleBlur: handleStatisticsBlur } =
  useField<Statistics>("statistics", {}, { validateOnValueUpdate: false });

const selectedBanks = computed(() => Object.keys(statistics.value));
const unselectedBanks = computed(() => {
  if (team?.value) {
    return banks.value
      .filter((bank) => bank.isAsync)
      .map((bank) => bank.name)
      .filter((bank) => !Object.keys(statistics.value).includes(bank));
  }
  return banks.value.filter((bank) => bank.isAsync).map((bank) => bank.name);
});

const onDropSelected = (banks: string[]) => {
  statistics.value = banks
    .map((bank) => {
      if (team?.value && statistics.value[bank]) {
        return { [bank]: statistics.value[bank] };
      }
      return { [bank]: ZERO_REQUESTS };
    })
    .reduce((target, source) => Object.assign(target, source), {});

  handleStatisticsBlur();
};
</script>

<template>
  <BaseDragDrop
    :selected="selectedBanks"
    :unselected="unselectedBanks"
    @on-drop-selected="onDropSelected"
  >
    <template #selectedLabel>
      <Translation
        keypath="team.banks-migration"
        tag="label"
        scope="global"
        class="custom-label"
      >
        <u>{{ $t("common.to", 1) }}</u>
      </Translation>
    </template>

    <template #unselectedLabel>
      <Translation
        keypath="team.banks-migration"
        tag="label"
        scope="global"
        class="custom-label"
      >
        <u>{{ $t("common.to", 0) }}</u>
      </Translation>
    </template>
  </BaseDragDrop>
</template>

<style scoped>
.custom-label {
  font-size: 13px;
  font-weight: bold;
}
</style>
