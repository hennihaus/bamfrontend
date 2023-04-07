<script setup lang="ts">
definePageMeta({
  name: "TeamsDetails",
});
const route = useRoute();
</script>

<template>
  <TeamDetails
    :uuid="route.params.uuid"
    :thumbnail-url="route.params.thumbnailUrl"
  />
</template>
