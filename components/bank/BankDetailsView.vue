<script setup lang="ts">
import { Bank } from "@hennihaus/bamconfigbackend";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ bank: Bank }>();

const { activeStatus, asyncStatus, updatedAt } = useBank(toRef(props, "bank"));
</script>

<template>
  <h1>{{ bank.name }}</h1>
  <h3>{{ activeStatus }}</h3>

  <div class="ui divider" />

  <div class="ui grid">
    <div class="four wide column">
      <img v-base-image-error :src="bank.thumbnailUrl" class="ui small image" />
    </div>

    <div class="four wide column">
      <template v-if="bank.isAsync">
        <h4>{{ $t("bank.jms-queue") }}</h4>
        <div>{{ bank.jmsQueue }}</div>
      </template>

      <h4>{{ $t("bank.interface") }}</h4>
      <div>{{ asyncStatus }}</div>
    </div>

    <div v-if="bank.creditConfiguration" class="four wide column">
      <BankCreditConfigurationListItem
        :credit-configuration="bank.creditConfiguration"
      />
    </div>

    <div class="four wide column">
      <h4>{{ $t("core.team", 2) }}</h4>
      <div v-if="bank.isAsync">
        {{ $t("common.counter", 1).toLowerCase() }}
      </div>
      <div v-else>{{ $t("common.counter", 2).toLowerCase() }}</div>
      <h4>{{ $t("common.last-updated") }}</h4>
      <div>{{ $d(updatedAt, "long") }}</div>
    </div>
  </div>

  <div class="ui divider" />
</template>
