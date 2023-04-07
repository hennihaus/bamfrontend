<script setup lang="ts">
import { Bank } from "@hennihaus/bamconfigbackend";

const props = defineProps<{ banks: Bank[] }>();

const activeBanks = computed(() =>
  props.banks.filter((bank) => bank.isActive && bank.creditConfiguration)
);
const hasAtLeastOneCreditConfig = computed(() =>
  props.banks.some((bank) => bank.creditConfiguration)
);
</script>

<template>
  <div v-if="hasAtLeastOneCreditConfig" class="ui grid">
    <div v-for="bank in activeBanks" :key="bank.uuid" class="eight wide column">
      <BankCreditConfigurationListItem
        :credit-configuration="bank.creditConfiguration"
        :title="bank.name"
      >
        <template #jmsQueue>
          <div v-if="bank.isAsync" data-test="jms-queue">
            {{ $t("bank.jms-queue") }}: {{ bank.jmsQueue }}
          </div>
        </template>
      </BankCreditConfigurationListItem>
    </div>
  </div>
</template>
