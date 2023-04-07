import { Task } from "@hennihaus/bamconfigbackend";

const TASKS_PATH = "/tasks";

export const useTasksFetch = async () => {
  const { data: tasks } = await useBaseFetch<Task[]>(TASKS_PATH);

  const asyncTask = computed(() => {
    return tasks?.value?.find((task) =>
      task.banks.some((bank) => bank.isAsync)
    );
  });

  const activatedTasks = computed(() => {
    return tasks?.value?.filter((task) => {
      if (!task.banks.some((bank) => bank.isAsync)) {
        return true;
      }
      return task.banks.some((bank) => bank.isActive);
    });
  });

  return {
    tasks: computed(() => tasks.value ?? []),
    activatedTasks: computed(() => activatedTasks.value ?? []),
    asyncTask,
  };
};

export const useTaskFetch = async (uuid: Ref<string>) => {
  const { data: task } = await useBaseFetch<Task>(
    `${TASKS_PATH}/${uuid.value}`,
    {
      watch: [uuid],
    }
  );

  const updateTask = async (update: Task): Promise<void> => {
    const { data } = await useBaseFetch<Task>(`${TASKS_PATH}/${update.uuid}`, {
      method: "PATCH",
      body: update,
    });
    task.value = data.value;
  };

  return {
    task,
    updateTask,
  };
};
