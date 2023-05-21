<script setup lang="ts">
defineOptions({ inheritAttrs: false });
defineProps<{ errors: string[] }>();
</script>

<template>
  <div v-for="error in errors" :key="error" class="ui negative message">
    {{ error }}
  </div>
</template>
