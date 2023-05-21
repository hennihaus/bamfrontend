<script setup lang="ts" generic="T">
import { useItemsPerWindowCalculator } from "~/composables";

const FIRST_PAGE_NUMBER = 1;
const PAGE_STEPPER_RANGE = 2;

defineOptions({ inheritAttrs: false });
defineSlots<{
  item: (props: { item: T }) => any;
  message: (props: {}) => any;
}>();

const props = withDefaults(
  defineProps<{
    pageNumber?: string | null;
    page: string;
    items: T[];
  }>(),
  {
    pageNumber: null,
  }
);

const { itemsPerWindow } = useItemsPerWindowCalculator();
const totalPages = computed(() =>
  Math.ceil(props.items.length / itemsPerWindow.value)
);
const currentPage = computed(() => {
  if (!props.pageNumber) {
    return FIRST_PAGE_NUMBER;
  }
  if (+props.pageNumber < FIRST_PAGE_NUMBER) {
    return FIRST_PAGE_NUMBER;
  }
  if (+props.pageNumber > totalPages.value) {
    return totalPages.value;
  }
  return +props.pageNumber;
});
const pages = computed(() => {
  const index = currentPage.value * itemsPerWindow.value - itemsPerWindow.value;
  return props.items.slice(index, index + itemsPerWindow.value);
});

const hasPages = computed(() => totalPages.value > FIRST_PAGE_NUMBER);
const pageNumbers = computed(() => {
  return [...Array(totalPages.value).keys()]
    .map((number) => number + 1)
    .filter((number) => {
      if (number === FIRST_PAGE_NUMBER) {
        return true;
      }
      if (number === totalPages.value) {
        return true;
      }
      return Math.abs(number - currentPage.value) < PAGE_STEPPER_RANGE;
    });
});
</script>

<template>
  <div class="container">
    <div class="ui middle aligned selection divided list">
      <template v-for="item in pages">
        <slot :item="item" name="item" />
      </template>

      <slot name="message" />
    </div>

    <div v-if="hasPages" class="ui pagination menu">
      <NuxtLink
        v-for="number in pageNumbers"
        :key="number"
        :to="{ name: page, params: { pageNumber: number } }"
        :class="{ active: number === currentPage }"
        class="item"
      >
        {{ number }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 52px;
}

.pagination {
  align-self: start;
  justify-self: center;
}
</style>
