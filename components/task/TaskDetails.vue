<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = defineProps<{ uuid: string }>();

const { task } = await useTaskFetch(toRef(props, "uuid"));
</script>

<template>
  <TaskDetailsView v-if="task" :task="task">
    <template #options>
      <NuxtLink :to="{ name: 'TasksEdit', params: { uuid } }">
        <button class="ui tiny yellow labeled icon button">
          <i class="write icon" /> {{ $t("task.edit") }}
        </button>
      </NuxtLink>
    </template>
  </TaskDetailsView>
</template>
