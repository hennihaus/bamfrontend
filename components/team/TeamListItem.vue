<script setup lang="ts">
import { Team } from "@hennihaus/bamconfigbackend";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ team: Team }>();

const thumbnailUrl = getRandomAvatarThumbnailUrl();

const { type, totalRequests, hasPassedStatus } = useTeam(toRef(props, "team"));
</script>

<template>
  <NuxtLink
    :to="{ name: 'TeamsDetails', params: { uuid: team.uuid, thumbnailUrl } }"
    class="item"
  >
    <img v-base-image-error :src="thumbnailUrl" class="ui tiny image" />

    <div class="content">
      <div class="header">{{ team.username }}</div>
      <div class="description">{{ $t("team.type") }}: {{ type }}</div>
      <div class="description">
        {{ $t("team.request", 2) }}: {{ totalRequests }}
      </div>
      <div class="description">
        {{ $t("common.status") }}: {{ hasPassedStatus }}
      </div>
      <div class="metadata">
        <template v-if="team.students.length">
          <span v-for="(student, index) in team.students" :key="student.uuid">
            {{ student.firstname }} {{ student.lastname }}
            <span v-if="index !== team.students.length - 1">, </span>
          </span>
        </template>
        <template v-else>
          {{ $t("team.student", 0) }}
        </template>
      </div>
    </div>
  </NuxtLink>
</template>
