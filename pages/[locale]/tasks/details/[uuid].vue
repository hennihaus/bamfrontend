<script setup lang="ts">
definePageMeta({
  name: "TasksDetails"
});
const route = useRoute();
</script>

<template>
  <TaskDetails :uuid="route.params.uuid" />
</template>