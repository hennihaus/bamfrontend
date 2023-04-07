<script setup lang="ts">
import { Pagination } from "@hennihaus/bamconfigbackend";

const props = defineProps<{ pagination: Pagination; page: string }>();

const hasPages = computed(() => {
  if (!props.pagination) {
    return false;
  }
  return props.pagination.prev || props.pagination.next;
});
const isFirstPage = computed(
  () => !props.pagination.prev && props.pagination.next
);
const isLastPage = computed(
  () => props.pagination.prev && !props.pagination.next
);
</script>

<template>
  <div class="container" :class="{ 'two-column-container': $slots.filters }">
    <div class="ui middle aligned selection divided list">
      <slot name="items" />
    </div>

    <div v-if="$slots.filters" class="filter-wrapper">
      <slot name="filters" />
    </div>

    <div v-if="hasPages" class="ui pagination menu">
      <NuxtLink
        :to="{
          name: page,
          query: { ...$route.query, cursor: pagination.first },
        }"
        :class="{ active: isFirstPage }"
        class="item"
      >
        {{ $t("base.pagination-start") }}
      </NuxtLink>
      <NuxtLink
        v-if="pagination.prev"
        :to="{
          name: page,
          query: { ...$route.query, cursor: pagination.prev },
        }"
        class="item"
      >
        {{ $t("base.pagination-prev") }}
      </NuxtLink>
      <NuxtLink
        v-if="pagination.next"
        :to="{
          name: page,
          query: { ...$route.query, cursor: pagination.next },
        }"
        class="item"
      >
        {{ $t("base.pagination-next") }}
      </NuxtLink>
      <NuxtLink
        :to="{
          name: page,
          query: { ...$route.query, cursor: pagination.last },
        }"
        :class="{ active: isLastPage }"
        class="item"
      >
        {{ $t("base.pagination-end") }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 52px;
  align-items: start;
}

.two-column-container {
  grid-template-columns: minmax(476.75px, 1fr) auto;
}

.filter-wrapper {
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  box-sizing: border-box;
  padding: 7px 16px;
}

.pagination {
  justify-self: center;
}
</style>
