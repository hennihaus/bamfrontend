<script setup lang="ts">
import {Bank} from "@hennihaus/bamconfigbackend";

const props = defineProps<{ bank: Bank }>();

const {activeStatus, asyncStatus} = useBank(toRef(props, "bank"));
</script>

<template>
  <NuxtLink :to="{ name: 'BanksDetails', params: { uuid: props.bank.uuid } }" class="item custom-item">
    <img
        v-base-image-error
        :src="bank.thumbnailUrl"
        class="ui tiny image custom-image"
    />

    <div class="content">
      <div class="header">{{ bank.name }}</div>
      <div class="description">
        {{ $t("common.status") }}: {{ activeStatus.toLowerCase() }}
      </div>
      <div class="metadata">
        {{ asyncStatus }}
        <br/>
        <div v-if="bank.isAsync">
          {{ $t("common.counter", 1) }} {{ $t("core.team", 2) }}
        </div>
        <div v-else>{{ $t("common.counter", 2) }} {{ $t("core.team", 2) }}</div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.custom-item {
  display: flex !important;
  height: 95px;
  align-items: center;
}

.custom-image {
  max-height: 80px;
  max-width: 80px;
}
</style>