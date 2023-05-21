<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const [{ teams, pagination }, { banks }] = await Promise.all([
  useTeamsFetch(),
  useBanksFetch(),
]);
</script>

<template>
  <BaseCursorPagination :pagination="pagination" page="TeamsList">
    <template #items>
      <TeamListItem v-for="team in teams" :key="team.uuid" :team="team" />

      <BaseMessage v-if="!teams.length" :message="$t('team.not-found', 2)" />
    </template>

    <template #filters>
      <div class="filter">
        <TeamListFilter :banks="banks" />
      </div>
    </template>
  </BaseCursorPagination>
</template>

<style scoped>
.filter {
  width: 256.25px;
}
</style>
