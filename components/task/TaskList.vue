<script setup lang="ts">
import { Ref } from "@vue/reactivity";
import { Task } from "@hennihaus/bamconfigbackend";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ pageNumber?: string | null }>(), {
  pageNumber: null,
});

const warningMessageType = MessageType.WARNING;

const { tasks, asyncTask } = await useTasksFetch();
const { hasNoAsyncBanksActivated } = useTask(asyncTask as Ref<Task>);
</script>

<template>
  <BaseFrontendPagination
    :items="tasks"
    :page-number="pageNumber"
    page="TasksList"
  >
    <template #item="{ item }">
      <TaskListItem :key="item.uuid" :task="item" />
    </template>

    <template #message>
      <BaseMessage
        v-if="hasNoAsyncBanksActivated"
        :message="$t('task.no-async-banks')"
        :type="warningMessageType"
      >
        <template #description>
          <p>{{ $t("task.no-async-banks-description") }}</p>
        </template>
      </BaseMessage>

      <BaseMessage v-if="!tasks.length" :message="$t('task.not-found', 2)" />
    </template>
  </BaseFrontendPagination>
</template>
