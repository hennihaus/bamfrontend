import { Team, TeamQuery, Teams } from "@hennihaus/bamconfigbackend";
import { Ref } from "@vue/reactivity";

const TEAMS_PATH = "/teams";
const BROKER_PATH = "/activemq";
const STATISTICS_PATH = "/statistics";

export const useTeamsFetch = async (teamQuery?: Ref<TeamQuery>) => {
  const { itemsPerWindow } = useItemsPerWindowCalculator();
  const route = useRoute();

  const query = computed(() => {
    if (teamQuery) {
      return teamQuery.value;
    }
    let query = route.query.cursor
      ? { cursor: route.query.cursor }
      : { ...route.query, limit: itemsPerWindow.value };

    if (query.hasPassed) {
      query = {
        ...query,
        hasPassed: query.hasPassed === "PASSED",
      };
    }

    return query;
  });
  const { data } = await useBaseFetch<Teams>(TEAMS_PATH, {
    watch: [query],
    query,
  });

  return {
    teams: computed(() => data.value?.items ?? []),
    pagination: computed(
      () => data.value?.pagination ?? { first: "", last: "" }
    ),
  };
};

export const useTeamFetch = async (
  uuid: Ref<string>,
  immediate: boolean = true
) => {
  const { t } = useBaseI18n();

  const message = ref("");

  const { data: team } = await useBaseFetch<Team>(
    `${TEAMS_PATH}/${uuid.value}`,
    {
      watch: [uuid],
      immediate,
    }
  );

  const updateTeam = async (update: Team): Promise<void> => {
    const { data } = await useBaseFetch<Team>(`${TEAMS_PATH}/${update.uuid}`, {
      method: "PUT",
      body: update,
    });
    team.value = data.value;
    message.value = "";
  };

  const deleteTeam = async (uuid: string): Promise<void> => {
    await useBaseFetch<void>(`${TEAMS_PATH}/${uuid}`, {
      method: "DELETE",
    });
    message.value = "";
  };

  const deleteQueue = async (jmsQueue: string): Promise<void> => {
    await useBaseFetch<void>(`${BROKER_PATH}/${jmsQueue}`, {
      method: "DELETE",
    });
    message.value = t("team.reset-jms-queue-success", {
      jmsQueue: team.value?.jmsQueue ?? "",
    });
  };
  const resetStats = async (uuid: string): Promise<void> => {
    const { data } = await useBaseFetch<Team>(
      `${TEAMS_PATH}/${uuid}${STATISTICS_PATH}`,
      {
        method: "DELETE",
      }
    );
    team.value = data.value;
    message.value = "";
  };

  return {
    team,
    message: readonly(message),
    updateTeam,
    deleteTeam,
    deleteQueue,
    resetStats,
  };
};
