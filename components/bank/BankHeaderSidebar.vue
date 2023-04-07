<script setup lang="ts">
const { t } = useBaseI18n();
const { asyncActiveBanks, refreshBanks } = await useBanksFetch(true);
const { recreateStatistics } = useStatisticsFetch();

const onRecreateStatistics = async (limit: number) => {
  if (confirm(t("core.team-recreate-warning"))) {
    await recreateStatistics(limit);
  }
};
</script>

<template>
  <div
    v-if="asyncActiveBanks && asyncActiveBanks.length"
    class="item"
    @mouseover.self="refreshBanks"
  >
    <div class="tiny ui yellow simple dropdown button">
      {{ $t("core.team-recreate") }}
      <div class="menu">
        <div
          v-for="limit in asyncActiveBanks.length"
          :key="limit"
          class="item"
          @click="onRecreateStatistics(limit)"
        >
          {{ limit }}
          <span v-if="limit === 1"
            >{{ $t("core.async") }} {{ $t("core.bank", 1) }}</span
          >
          <span v-else>{{ $t("core.async") }} {{ $t("core.bank", 2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
