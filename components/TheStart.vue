<script setup lang="ts">
const { t } = useBaseI18n();
const { resetBroker, message } = useBrokerFetch();
const type = MessageType.POSITIVE;
const config = useRuntimeConfig();

const onResetBroker = async () => {
  if (confirm(t("core.home-restart-course-warning"))) {
    await resetBroker();
  }
};
</script>

<template>
  <h1>{{ $t("core.start") }}</h1>
  <p>{{ $t("core.home-description") }}</p>

  <NuxtLink :to="config.activeMqURL" target="_blank" class="ui olive button">
    ActiveMQ
    <i class="right info icon" />
  </NuxtLink>
  <NuxtLink
    :to="config.googleCloudIamURL"
    target="_blank"
    class="ui olive button"
  >
    TODO
    <i class="right info icon" />
  </NuxtLink>

  <button class="ui red button" @click="onResetBroker">
    {{ $t("core.home-restart-course") }}
    <i class="right refresh icon" />
  </button>

  <BaseMessage v-if="message" :message="message" :type="type" />
</template>
