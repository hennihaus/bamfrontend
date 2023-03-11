<script setup lang="ts">
definePageMeta({
  name: "BanksEdit",
});
const route = useRoute();
</script>

<template>
  <BankEdit :uuid="route.params.uuid"/>
</template>