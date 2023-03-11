<script setup lang="ts">
import {Bank} from "@hennihaus/bamconfigbackend";

const props = defineProps<{ uuid: string }>();

const {bank, updateBank} = await useBankFetch(toRef(props, "uuid"));

const onSubmitBank = async (bank: Bank) => {
  await updateBank(bank);
  await navigateTo({
    name: "BanksDetails",
    params: {
      uuid: bank.uuid
    }
  });
};
</script>

<template>
  <template v-if="bank">
    <h1>{{ $t("bank.edit", {bank: bank.name}) }}</h1>
    <BankForm :bank="bank" @submit-bank="onSubmitBank"/>
  </template>
</template>