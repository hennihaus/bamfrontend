<script setup lang="ts">
import { Task } from "@hennihaus/bamconfigbackend";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ uuid: string }>();

const { task, updateTask } = await useTaskFetch(toRef(props, "uuid"));

const onSubmitTask = async (task: Task) => {
  await updateTask(task);
  await navigateTo({
    name: "TasksDetails",
    params: {
      uuid: task.uuid,
    },
  });
};
</script>

<template>
  <TaskForm v-if="task" :task="task" @submit-task="onSubmitTask">
    <template #task-headline>{{ $t("task.edit") }}</template>
    <template #parameters-headline>{{ $t("task.parameter-edit") }}</template>
    <template #responses-headline>{{ $t("task.response-edit") }}</template>
  </TaskForm>
</template>
