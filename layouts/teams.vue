<script setup lang="ts">
defineSlots<{ default: (props: {}) => any }>();
</script>

<template>
  <BaseLayout>
    <template #default>
      <slot />
    </template>

    <template #sidebar>
      <TeamHeaderSidebar />
    </template>
  </BaseLayout>
</template>
