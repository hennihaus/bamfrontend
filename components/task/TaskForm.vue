<script setup lang="ts">
import { Response, Task } from "@hennihaus/bamconfigbackend";

defineOptions({ inheritAttrs: false });
defineSlots<{
  "task-headline": (props: {}) => any;
  "responses-headline": (props: {}) => any;
  "parameters-headline": (props: {}) => any;
}>();

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{ submitTask: [task: Task] }>();

const initialValues = computed(() => props.task);
const { handleSubmit, meta, isSubmitting } = useForm({
  initialValues,
  validateOnMount: false,
  keepValuesOnUnmount: false,
});
const onSubmit = handleSubmit((values: Task) => {
  const task: Task = {
    ...values,
    responses: values.responses.map((response: Response) => ({
      ...response,
      example: response.example.replace(/\s/g, ""),
    })),
  };
  emit("submitTask", task);
});

const currentTab = ref(0);
const tabs = [
  resolveComponent("TaskFormCommon"),
  resolveComponent("TaskFormParameters"),
  resolveComponent("TaskFormResponses"),
];
const hasPrevTab = computed(() => currentTab.value > 0);
const hasNextTab = computed(() => currentTab.value < tabs.length - 1);
const isFirstTab = computed(() => currentTab.value === 0);
const isLastTab = computed(() => currentTab.value === tabs.length - 1);
const stepTab = computed(() => `${currentTab.value + 1}/${tabs.length}`);
const onPrev = () => currentTab.value--;
const onNext = () => currentTab.value++;
</script>

<template>
  <form class="ui equal width form" @submit="onSubmit">
    <h1>
      <span>
        <slot v-if="isFirstTab" name="task-headline" />
        <slot v-else-if="isLastTab" name="responses-headline" />
        <slot v-else name="parameters-headline" />
      </span>
      <span> ({{ $t("task.step") }} {{ stepTab }})</span>
    </h1>

    <KeepAlive>
      <component :is="tabs[currentTab]" :task="task" />
    </KeepAlive>

    <div class="fields">
      <div v-if="hasPrevTab" class="field">
        <button
          :disabled="!meta.valid"
          :class="[meta.valid ? 'orange' : 'red']"
          class="ui fluid button"
          type="button"
          @click="onPrev"
        >
          {{ $t("base.pagination-prev") }}
        </button>
      </div>
      <div v-if="hasNextTab" class="field">
        <button
          :disabled="!meta.valid"
          :class="[meta.valid ? 'green' : 'red']"
          class="ui fluid button"
          type="button"
          @click="onNext"
        >
          {{ $t("base.pagination-next") }}
        </button>
      </div>
      <div v-if="isLastTab" class="field">
        <button
          :disabled="!meta.valid || isSubmitting"
          :class="[meta.valid ? 'green' : 'red']"
          class="ui fluid button"
          type="submit"
        >
          {{ $t("common.save") }}
        </button>
      </div>
    </div>
  </form>
</template>
