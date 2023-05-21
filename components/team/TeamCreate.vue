<script setup lang="ts">
import { Team } from "@hennihaus/bamconfigbackend";

defineOptions({ inheritAttrs: false });

const [{ banks }, { updateTeam }] = await Promise.all([
  useBanksFetch(),
  useTeamFetch(ref(""), false),
]);
provide(BANKS, banks);

const onSubmitTeam = async (team: Team) => {
  await updateTeam(team);
  await navigateTo({
    name: "TeamsDetails",
    params: {
      uuid: team.uuid,
      thumbnailUrl: getRandomAvatarThumbnailUrl(),
    },
  });
};
</script>

<template>
  <h1>{{ $t("team.create") }}</h1>
  <TeamForm @submit-team="onSubmitTeam" />
</template>
