<script setup lang="ts">
definePageMeta({
  name: "TeamsEdit",
});
const route = useRoute();
</script>

<template>
  <TeamEdit :uuid="route.params.uuid" :thumbnail-url="route.params.thumbnailUrl"/>
</template>