<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const emit = defineEmits<{ close: [] }>();

const { activatedTasks } = await useTasksFetch();

const onClose = () => emit("close");
onBeforeMount(() => setTimeout(() => window.print(), 1_000));
onMounted(() => window.addEventListener("afterprint", onClose));
onUnmounted(() => window.removeEventListener("afterprint", onClose));
</script>

<template>
  <div v-for="task in activatedTasks" :key="task.uuid" class="page">
    <TaskDetailsView :task="task">
      <template #details>
        <BankCreditConfigurationList :banks="task.banks" />

        <TaskEndpointList :endpoints="task.endpoints" />
      </template>
    </TaskDetailsView>
  </div>

  <BaseMessage
    v-if="!activatedTasks.length"
    :message="$t('task.not-found', 2)"
    size="massive"
  />
</template>

<style scoped>
.page {
  page-break-before: always;
}
</style>
