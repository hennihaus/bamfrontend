<script setup lang="ts">
import {Team} from "@hennihaus/bamconfigbackend";
import {useForm} from "vee-validate";

const emit = defineEmits<{ (event: "submitTeam", team: Team): void }>();

const oldTeam = inject(TEAM, () => ref<Team>(), true);

const initialValues = computed(() => {
  if (oldTeam.value) {
    return {
      ...oldTeam.value,
      students: oldTeam.value.students.length
          ? oldTeam.value.students
          : [createEmptyStudent()],
      statistics: removeStatistics(oldTeam.value),
    };
  }
  return createEmptyTeam();
});
const {handleSubmit, validateField} = useForm<Team>({
  initialValues,
  validateOnMount: false,
  keepValuesOnUnmount: false,
});
const onSubmit = handleSubmit((newTeam: Team) => {
  const statistics = mergeStatistics(newTeam, oldTeam.value);
  const students = newTeam.students.filter(
      (student) => student.firstname && student.lastname
  );
  const createdAt = newTeam.createdAt || createLocalDateTime();
  const updatedAt = createLocalDateTime();

  emit("submitTeam", {
        ...newTeam,
        students,
        statistics,
        createdAt,
        updatedAt,
      }
  );
});

const createLocalDateTime = (): string => {
  const date = new Date();
  date.setMilliseconds(0);
  return date.toISOString().split(".000Z")[0];
};
</script>

<template>
  <form class="ui form" @submit="onSubmit">
    <TeamFormCommon/>
    <TeamFormStudents :validate-field="validateField"/>
    <TeamFormStatistics/>
  </form>
</template>