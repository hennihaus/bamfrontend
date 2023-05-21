<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineEmits<{ printTasks: [] }>();
</script>

<template>
  <div class="item">
    <div class="tiny ui olive button" @click="$emit('printTasks')">
      {{ $t("core.task-print") }}
    </div>
  </div>
</template>
