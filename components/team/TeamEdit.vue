<script setup lang="ts">
import { Team } from "@hennihaus/bamconfigbackend";

const props = defineProps<{ uuid: string; thumbnailUrl: string }>();

const [{ banks }, { team, updateTeam }] = await Promise.all([
  useBanksFetch(),
  useTeamFetch(toRef(props, "uuid")),
]);
provide(BANKS, banks);
provide(TEAM, team);

const onSubmitTeam = async (team: Team) => {
  await updateTeam(team);
  await navigateTo({
    name: "TeamsDetails",
    params: {
      uuid: team.uuid,
      thumbnailUrl: props.thumbnailUrl,
    },
  });
};
</script>

<template>
  <h1>{{ $t("team.edit") }}</h1>
  <TeamForm @submit-team="onSubmitTeam" />
</template>
