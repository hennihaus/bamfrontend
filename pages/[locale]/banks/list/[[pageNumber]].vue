<script setup lang="ts">
definePageMeta({
  name: "BanksList"
});
const route = useRoute();
</script>

<template>
  <BankList :page-number="route.params.pageNumber"/>
</template>