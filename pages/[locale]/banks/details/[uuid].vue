<script setup lang="ts">
definePageMeta({
  name: "BanksDetails",
});
const route = useRoute();
</script>

<template>
  <BankDetails :uuid="route.params.uuid" />
</template>
