<script setup lang="ts">
definePageMeta({
  name: "TasksList",
});
const route = useRoute();
</script>

<template>
  <TaskList :page-number="route.params.pageNumber"/>
</template>