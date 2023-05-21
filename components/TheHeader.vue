<script setup lang="ts">
defineOptions({ inheritAttrs: false });
defineSlots<{ sidebar?: (props: {}) => any }>();
</script>

<template>
  <div class="ui menu">
    <TheLanguage />

    <NuxtLink :to="{ name: 'Start' }" exact-active-class="active" class="item">
      {{ $t("core.start") }}
    </NuxtLink>
    <NuxtLink :to="{ name: 'TasksIndex' }" active-class="active" class="item">
      {{ $t("core.task", 2) }}
    </NuxtLink>
    <NuxtLink :to="{ name: 'BanksIndex' }" active-class="active" class="item">
      {{ $t("core.bank", 2) }}
    </NuxtLink>
    <NuxtLink
      :to="{ name: 'TeamsIndex' }"
      active-class="active"
      active
      class="item"
    >
      {{ $t("core.team", 2) }}
    </NuxtLink>

    <slot name="sidebar" />
  </div>
</template>
