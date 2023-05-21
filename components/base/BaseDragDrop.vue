<script setup lang="ts">
type List = "SELECTED" | "UNSELECTED";
type Item = { id: string; list: List };

const DRAG_DROP_KEY = "id";

defineOptions({ inheritAttrs: false });
defineSlots<{
  selectedLabel?: (props: {}) => any;
  unselectedLabel?: (props: {}) => any;
}>();

const props = withDefaults(
  defineProps<{ selected?: string[]; unselected?: string[] }>(),
  {
    selected: () => [],
    unselected: () => [],
  }
);

const emit = defineEmits<{
  onDropSelected: [items: string[]];
  onDropUnselected: [items: string[]];
}>();

const allItems = ref<Item[]>([
  ...props.selected.map((item) => ({ id: item, list: "SELECTED" as List })),
  ...props.unselected.map((item) => ({ id: item, list: "UNSELECTED" as List })),
]);
const selectedItems = computed(() =>
  allItems.value.filter((item) => item.list === "SELECTED")
);
const unselectedItems = computed(() =>
  allItems.value.filter((item) => item.list === "UNSELECTED")
);

const onDrag = (event: DragEvent, item: Item) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(DRAG_DROP_KEY, item.id);
  }
};
const onDrop = (event: DragEvent, list: List) => {
  if (event.dataTransfer) {
    const id = event.dataTransfer?.getData(DRAG_DROP_KEY);
    allItems.value = allItems.value.map((item) =>
      item.id === id ? { ...item, list } : item
    );

    emit(
      "onDropSelected",
      selectedItems.value.map((item) => item.id)
    );
    emit(
      "onDropUnselected",
      unselectedItems.value.map((item) => item.id)
    );
  }
};
</script>

<template>
  <div class="ui grid">
    <div class="eight wide column">
      <slot name="selectedLabel" />
      <div
        class="ui segments"
        @drop="onDrop($event, 'SELECTED')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="item in selectedItems"
          :key="item.id"
          class="ui segment"
          draggable="true"
          @dragstart="onDrag($event, item)"
        >
          {{ item.id }}
        </div>
        <div v-if="!selectedItems.length" class="ui segment">
          {{ $t("common.counter", 0) }}
        </div>
      </div>
    </div>

    <div class="eight wide column">
      <slot name="unselectedLabel" />
      <div
        class="ui segments"
        @drop="onDrop($event, 'UNSELECTED')"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          v-for="item in unselectedItems"
          :key="item.id"
          class="ui segment"
          draggable="true"
          @dragstart="onDrag($event, item)"
        >
          {{ item.id }}
        </div>
        <div v-if="!unselectedItems.length" class="ui segment">
          {{ $t("common.counter", 0) }}
        </div>
      </div>
    </div>
  </div>
</template>
