<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="item">
    <NuxtLink :to="{ name: 'TeamsCreate' }" class="tiny ui olive button">
      <div>{{ $t("team.create") }}</div>
    </NuxtLink>
  </div>
</template>
