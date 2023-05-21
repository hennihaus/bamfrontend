<script setup lang="ts">
import { Team } from "@hennihaus/bamconfigbackend";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ team: Team }>();

const { statistics } = useTeam(toRef(props, "team"));

const { capitalizePassed } = useCapitalizedPassed();
</script>

<template>
  <table class="ui small compact collapsing celled table">
    <thead>
      <tr>
        <th class="left aligned">{{ $t("core.bank", 1) }}</th>
        <th class="center aligned">{{ $t("team.request", 2) }}</th>
        <th class="center aligned">{{ $t("common.percentage") }}</th>
        <th class="center aligned">{{ capitalizePassed }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="statistic in statistics">
        <td class="left aligned">{{ statistic.bank }}</td>
        <td class="center aligned">{{ statistic.requests }}</td>
        <td class="center aligned">
          {{ $n(statistic.percentage, "percent") }}
        </td>
        <td class="center aligned">
          <i v-if="statistic.hasPassed" class="green checkmark icon" />
          <i v-else class="red close icon" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
