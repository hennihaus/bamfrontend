export const useStatisticsFetch = () => {
  const recreateStatistics = async (limit: number): Promise<void> => {
    await useBaseFetch<void>(`/statistics/${limit}`, { method: "POST" });
  };

  return {
    recreateStatistics,
  };
};
