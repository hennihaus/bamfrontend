<script setup lang="ts">
withDefaults(defineProps<{ pageNumber?: string | null }>(), {
  pageNumber: null,
});

const { banks } = await useBanksFetch();
</script>

<template>
  <BaseFrontendPagination
    :items="banks"
    :page-number="pageNumber"
    page="BanksList"
  >
    <template #item="{ item }">
      <BankListItem :key="item.uuid" :bank="item" />
    </template>

    <template #message>
      <BaseMessage v-if="!banks.length" :message="$t('bank.not-found', 2)" />
    </template>
  </BaseFrontendPagination>
</template>
