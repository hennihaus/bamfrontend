<script setup lang="ts">
const isLoading = useIsLoading();

const handleError = () => isLoading.value = false;
</script>

<template>
  <div class="container">
    <header class="header">
      <TheHeader>
        <template #sidebar>
          <div class="right menu">
            <NuxtErrorBoundary @error="handleError">
              <template #default>
                <slot name="sidebar"/>
              </template>

              <template #error>
                <BaseErrorButton />
              </template>
            </NuxtErrorBoundary>

            <div class="item">
              <div class="tiny ui orange button">{{ $t("core.logout") }}</div>
            </div>
          </div>
        </template>
      </TheHeader>
    </header>

    <main class="content">
      <NuxtErrorBoundary @error="handleError">
        <template #default>
          <slot/>
        </template>

        <template #error>
          <BaseErrorMessage />
        </template>
      </NuxtErrorBoundary>

      <div v-if="isLoading" class="ui active dimmer">
        <div class="ui large text loader">{{ $t("base.loading") }}</div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.header {
  margin-bottom: 1rem;
}

.content {
  height: 100%;
  padding-bottom: 10px;
}

@media print {
  .container {
    display: none;
  }
}
</style>