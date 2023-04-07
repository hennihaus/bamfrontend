<script setup lang="ts">
const isPrintingTasks = ref(false);
const onPrintTasks = () => (isPrintingTasks.value = true);
const onPrintClose = () => (isPrintingTasks.value = false);
</script>

<template>
  <div class="content">
    <BaseLayout>
      <template #default>
        <slot />
      </template>

      <template #sidebar>
        <TaskHeaderSidebar @print-tasks="onPrintTasks" />
      </template>
    </BaseLayout>

    <TaskPrint v-if="isPrintingTasks" @close="onPrintClose" />
  </div>
</template>

<style scoped>
.content {
  height: 100%;
}
</style>
