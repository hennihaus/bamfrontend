<script setup lang="ts">
definePageMeta({
  name: "TasksEdit",
});
const route = useRoute();
</script>

<template>
  <TaskEdit :uuid="route.params.uuid" />
</template>
