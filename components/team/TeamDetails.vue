<script setup lang="ts">
const props = defineProps<{ uuid: string; thumbnailUrl: string }>();

const regularTeamType = TeamType.REGULAR;
const positiveMessageType = MessageType.POSITIVE;

const { t } = useBaseI18n();

const { team, message, deleteTeam, deleteQueue, resetStats } =
  await useTeamFetch(toRef(props, "uuid"));

const onDeleteTeam = async () => {
  if (confirm(t("team.delete-warning"))) {
    await deleteTeam(props.uuid);
    await navigateTo({ name: "TeamsList" });
  }
};
const onDeleteQueue = async () => {
  if (confirm(t("team.reset-jms-queue-warning"))) {
    await deleteQueue(team.value.jmsQueue);
  }
};
const onResetStats = async () => {
  if (confirm(t("team.reset-requests-warning"))) {
    await resetStats(props.uuid);
  }
};
</script>

<template>
  <template v-if="team">
    <TeamDetailsView :team="team" :thumbnail-url="thumbnailUrl" />

    <button
      v-if="team.type === regularTeamType"
      class="ui tiny red labeled icon button"
      @click="onDeleteTeam"
    >
      <i class="trash icon" /> {{ $t("team.delete") }}
    </button>

    <NuxtLink :to="{ name: 'TeamsEdit', params: { uuid, thumbnailUrl } }">
      <button class="ui tiny yellow labeled icon button">
        <i class="write icon" /> {{ $t("team.edit") }}
      </button>
    </NuxtLink>

    <button class="ui tiny orange labeled icon button" @click="onDeleteQueue">
      <i class="remove icon" /> {{ $t("team.reset-jms-queue") }}
    </button>

    <button class="ui tiny orange labeled icon button" @click="onResetStats">
      <i class="remove icon" /> {{ $t("team.reset-requests") }}
    </button>
  </template>

  <BaseMessage v-if="message" :message="message" :type="positiveMessageType" />
</template>
