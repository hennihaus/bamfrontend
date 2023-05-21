<script setup lang="ts">
import { Parameter, Task, TeamQuery } from "@hennihaus/bamconfigbackend";
import { TeamType } from "~/utils/models";

defineOptions({ inheritAttrs: false });

const { t } = useBaseI18n();
const ratingLevels = RatingLevel;

const props = defineProps<{ task: Task }>();

const { teams } = await useTeamsFetch(
  ref<TeamQuery>({ limit: 1, type: TeamType.EXAMPLE })
);

const { fields: parameters } = useFieldArray<Parameter>("parameters");
const descriptionRules = {
  max: 100,
};
const exampleRules = {
  required: true,
  min: 1,
  max: 50,
};
const delayInMillisecondsExampleRules = {
  required: true,
  integer: true,
  min_value: 0,
  max_value: Number.MAX_SAFE_INTEGER,
};

const isRatingLevelEditField = (parameter: Parameter): boolean => {
  return parameter.name === "ratingLevel";
};

const isDelayInMillisecondsField = (parameter: Parameter): boolean => {
  return parameter.name === "delayInMilliseconds";
};

const isTeamEditField = (parameter: Parameter): boolean => {
  return parameter.name === "username" || parameter.name === "password";
};
const onTeamEditClick = async (): Promise<void> => {
  if (confirm(t("common.save-lost-warning"))) {
    await navigateTo({
      name: "TeamsEdit",
      params: {
        uuid: teams.value[0].uuid,
        thumbnailUrl: getRandomAvatarThumbnailUrl(),
      },
    });
  }
};

const isBankEditField = (parameter: Parameter): boolean => {
  return (
    parameter.name === "amountInEuros" || parameter.name === "termInMonths"
  );
};
const onBankEditClick = async (): Promise<void> => {
  if (confirm(t("common.save-lost-warning"))) {
    await navigateTo({
      name: "BanksEdit",
      params: {
        uuid:
          props.task.banks.find(
            (bank) => bank.isActive && !bank.isAsync && bank.creditConfiguration
          )?.uuid ?? "",
      },
    });
  }
};
</script>

<template>
  <div v-for="(param, index) in parameters" :key="param.key" class="fields">
    <div class="field">
      <Field
        v-slot="{ field, errors }"
        :name="`parameters[${index}].description`"
        :rules="descriptionRules"
        :label="$t('task.parameter-description')"
      >
        <label>
          {{ param.value.name }} ({{ param.value.type.toLowerCase() }})
        </label>
        <input v-bind="field" type="text" />
        <BaseFormMessage :errors="errors" />
      </Field>
    </div>

    <div class="field">
      <label>{{ $t("task.parameter-example") }}</label>

      <Field
        v-if="isRatingLevelEditField(param.value)"
        v-slot="{ value }"
        :name="`parameters[${index}].example`"
        as="select"
        class="select"
      >
        <option
          v-for="ratingLevel in ratingLevels"
          :key="ratingLevel"
          :value="ratingLevel"
          :selected="ratingLevel === value"
        >
          {{ ratingLevel }}
        </option>
      </Field>

      <Field
        v-else-if="isDelayInMillisecondsField(param.value)"
        v-slot="{ field, errors }"
        :name="`parameters[${index}].example`"
        :rules="delayInMillisecondsExampleRules"
        :label="$t('task.parameter-example')"
      >
        <div class="ui left corner labeled input">
          <input v-bind="field" type="number" />
          <div class="ui left corner label">
            <i class="asterisk icon" />
          </div>
        </div>
        <BaseFormMessage :errors="errors" />
      </Field>

      <div v-else-if="isTeamEditField(param.value)" class="ui action input">
        <div class="ui left corner labeled input">
          <input :value="param.value.example" :disabled="true" type="text" />
          <div class="ui left corner label">
            <i class="asterisk icon" />
          </div>
        </div>
        <button type="button" class="ui button" @click="onTeamEditClick">
          {{ $t("team.edit-example") }}
        </button>
      </div>

      <div v-else-if="isBankEditField(param.value)" class="ui action input">
        <div class="ui left corner labeled input">
          <input :value="param.value.example" :disabled="true" type="text" />
          <div class="ui left corner label">
            <i class="asterisk icon" />
          </div>
        </div>
        <button type="button" class="ui button" @click="onBankEditClick">
          {{ $t("bank.edit", { bank: $t("core.bank", 1) }) }}
        </button>
      </div>

      <Field
        v-else
        v-slot="{ field, errors }"
        :name="`parameters[${index}].example`"
        :rules="exampleRules"
        :label="$t('task.parameter-example')"
      >
        <div class="ui left corner labeled input">
          <input v-bind="field" type="text" />
          <div class="ui left corner label">
            <i class="asterisk icon" />
          </div>
        </div>
        <BaseFormMessage :errors="errors" />
      </Field>
    </div>
  </div>
</template>

<style scoped>
.select {
  appearance: none;
}
</style>
