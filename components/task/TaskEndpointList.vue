<script setup lang="ts">
import { Endpoint } from "@hennihaus/bamconfigbackend";

defineOptions({ inheritAttrs: false });

defineProps<{ endpoints: Endpoint[] }>();
</script>

<template>
  <h4>{{ $t("task.endpoint", 2) }}</h4>
  <template v-for="endpoint in endpoints" :key="endpoint.uuid">
    <div>
      {{ endpoint.type }}-{{ $t("task.endpoint", 1) }}:&nbsp;
      <NuxtLink v-if="endpoint.url" :to="endpoint.url" target="_blank">
        {{ endpoint.url }}
      </NuxtLink>
      <template v-else>
        {{ $t("common.hint") }} {{ $t("task.documentation") }}
      </template>
    </div>
    <div>
      {{ endpoint.type }}-{{ $t("task.documentation") }}:&nbsp;
      <NuxtLink v-if="endpoint.docsUrl" :to="endpoint.docsUrl" target="_blank">
        {{ endpoint.docsUrl }}
      </NuxtLink>
      <template v-else>{{ $t("common.available", 0) }}</template>
    </div>
  </template>
</template>
