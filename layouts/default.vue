<script setup lang="ts">
defineSlots<{ default: (props: {}) => any }>();
</script>

<template>
  <BaseLayout>
    <template #default>
      <slot />
    </template>
  </BaseLayout>
</template>
