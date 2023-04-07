<script setup lang="ts">
import { Translation } from "vue-i18n";

const { locale } = useBaseI18n();

const navigateToHome = () => clearError({ redirect: `/${locale.value}` });
</script>

<template>
  <BaseMessage :message="$t('common.error')">
    <template #icon>
      <i class="home icon custom" @click="navigateToHome" />
    </template>

    <template #description>
      <Translation
        keypath="core.start-navigation"
        tag="p"
        scope="global"
        class="custom"
        @click="navigateToHome"
      >
        <template #start>
          <u>{{ $t("core.start") }}</u>
        </template>
      </Translation>
    </template>
  </BaseMessage>
</template>

<style scoped>
.custom {
  cursor: pointer;
}
</style>
