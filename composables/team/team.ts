import { Team } from "@hennihaus/bamconfigbackend";
import { Statistic } from "~/utils/models";

const ZERO_REQUESTS = 0;

export const useTeam = (team: Ref<Team>) => {
  const { t } = useBaseI18n();

  const type = computed(() => {
    let type;

    switch (team.value.type) {
      case TeamType.EXAMPLE:
        type = t("team.type-checkbox", 0);
        break;
      case TeamType.REGULAR:
        type = t("team.type-checkbox", 1);
        break;
      default:
        type = t("common.unknown");
    }

    return type;
  });

  const totalRequests = computed(() => {
    return Object.values(team.value.statistics).reduce(
      (requests, request) => requests + request,
      0
    );
  });

  const hasPassedStatus = computed(() =>
    team.value.hasPassed ? t("team.passed", 1) : t("team.passed", 0)
  );

  const createdAt = computed(() => new Date(team.value.createdAt));

  const updatedAt = computed(() => new Date(team.value.updatedAt));

  const statistics = computed<Statistic[]>(() => {
    return Object.entries(team.value.statistics).map(([bank, requests]) => ({
      bank,
      requests,
      percentage: totalRequests.value
        ? requests / totalRequests.value
        : ZERO_REQUESTS,
      hasPassed: requests > ZERO_REQUESTS,
    }));
  });

  return {
    type,
    totalRequests,
    hasPassedStatus,
    statistics,
    createdAt,
    updatedAt,
  };
};
