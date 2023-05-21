<script setup lang="ts">
import { MessageType } from "~/utils/models";

defineOptions({ inheritAttrs: false });
defineSlots<{ icon?: (props: {}) => any; description?: (props: {}) => any }>();

withDefaults(
  defineProps<{
    message: string;
    type?: MessageType;
    size?: string;
  }>(),
  {
    type: MessageType.NEGATIVE,
    size: "",
  }
);
</script>

<template>
  <div class="ui message" :class="[type, size, { icon: $slots.icon }]">
    <slot name="icon" />

    <div class="content">
      <div class="header">
        {{ message }}
      </div>

      <slot name="description" />
    </div>
  </div>
</template>
