<script setup lang="ts">
defineEmits<{ (event: "printTasks"): void }>();
</script>

<template>
  <div class="item">
    <div class="tiny ui olive button" @click="$emit('printTasks')">
      {{ $t("core.task-print") }}
    </div>
  </div>
</template>