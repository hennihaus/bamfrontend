<script setup lang="ts">
import { Bank } from "@hennihaus/bamconfigbackend";
import { useField, useForm } from "vee-validate";
import { HasPassed, TeamFormQuery, TeamType } from "~/utils/models";

defineProps<{ banks: Bank[] }>();

const teamTypes = TeamType;
const route = useRoute();

const { handleSubmit, isSubmitting } = useForm<TeamFormQuery>({
  initialValues: {
    username: "",
    jmsQueue: "",
    studentFirstname: "",
    studentLastname: "",
    banks: [],
    ...route.query,
  },
  keepValuesOnUnmount: false,
  validateOnMount: false,
});
const onSubmit = handleSubmit.withControlled(async (values: TeamFormQuery) => {
  const query = buildQuery(values);
  await navigateTo({ name: "TeamsList", query });
});
const onReset = handleSubmit.withControlled(async (_, { resetForm }) => {
  resetForm();
  await navigateTo({ name: "TeamsList" });
});

const { value: username, handleBlur: handleUsernameBlur } = useField<string>(
  "username",
  {},
  { validateOnValueUpdate: false, type: "text" }
);
const { value: jmsQueue, handleBlur: handleJmsQueueBlur } = useField<string>(
  "jmsQueue",
  {},
  { validateOnValueUpdate: false, type: "text" }
);
const { value: hasPassed, handleBlur: handleHasPassedBlur } =
  useField<HasPassed>(
    "hasPassed",
    {},
    { validateOnValueUpdate: false, type: "radio" }
  );
const { value: type, handleBlur: handleTypeBlur } = useField<TeamType>(
  "type",
  {},
  { validateOnValueUpdate: false, type: "radio" }
);
const { value: minRequests, handleBlur: handleMinRequestsBlur } =
  useField<number>(
    "minRequests",
    {},
    { validateOnValueUpdate: false, type: "number" }
  );
const { value: maxRequests, handleBlur: handleMaxRequestsBlur } =
  useField<number>(
    "maxRequests",
    {},
    { validateOnValueUpdate: false, type: "number" }
  );
const { value: studentFirstname, handleBlur: handleStudentFirstnameBlur } =
  useField<string>(
    "studentFirstname",
    {},
    { validateOnValueUpdate: false, type: "text" }
  );
const { value: studentLastname, handleBlur: handleStudentLastnameBlur } =
  useField<string>(
    "studentLastname",
    {},
    { validateOnValueUpdate: false, type: "text" }
  );

const { capitalizePassed } = useCapitalizedPassed();
</script>

<template>
  <form class="ui form wrapper" @submit="onSubmit">
    <div class="field">
      <label>{{ $t("team.username") }}</label>
      <input
        v-model="username"
        :placeholder="$t('common.name')"
        type="text"
        @blur="handleUsernameBlur"
      />
    </div>

    <div class="field">
      <label>{{ $t("team.jms-queue") }}</label>
      <input
        v-model="jmsQueue"
        :placeholder="$t('common.name')"
        type="text"
        @blur="handleJmsQueueBlur"
      />
    </div>

    <div class="field">
      <label>{{ capitalizePassed }}</label>
      <div class="inline fields">
        <div class="field">
          <div class="ui radio checkbox">
            <input
              v-model="hasPassed"
              value="PASSED"
              type="radio"
              @blur="handleHasPassedBlur"
            />
            <label>{{ $t("common.answer", 1) }}</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              v-model="hasPassed"
              value="NOT_PASSED"
              type="radio"
              @blur="handleHasPassedBlur"
            />
            <label>{{ $t("common.answer", 0) }}</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              v-model="hasPassed"
              :value="undefined"
              type="radio"
              @blur="handleHasPassedBlur"
            />
            <label>{{ $t("common.answer", 2) }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>{{ $t("team.type") }}</label>
      <div class="inline fields">
        <div
          v-for="(teamType, _, index) in teamTypes"
          :key="teamType"
          class="field"
        >
          <div class="ui radio checkbox">
            <input
              v-model="type"
              :value="teamType"
              type="radio"
              @blur="handleTypeBlur"
            />
            <label>{{ $t("team.type-checkbox", index) }}</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input
              v-model="type"
              :value="undefined"
              type="radio"
              @blur="handleTypeBlur"
            />
            <label>{{ $t("team.type-checkbox", 2) }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label>{{ $t("team.request", 2) }}</label>
      <div class="two fields">
        <div class="field">
          <input
            v-model="minRequests"
            :placeholder="$t('team.request-min-placeholder')"
            type="number"
            min="0"
            step="1"
            onfocus="this.previousValue = this.value"
            onkeydown="this.previousValue = this.value"
            oninput="validity.valid || (value = this.previousValue)"
            @blur="handleMinRequestsBlur"
          />
        </div>
        <div class="field">
          <input
            v-model="maxRequests"
            :placeholder="$t('team.request-max-placeholder')"
            type="number"
            min="0"
            step="1"
            onfocus="this.previousValue = this.value"
            onkeydown="this.previousValue = this.value"
            oninput="validity.valid || (value = this.previousValue)"
            @blur="handleMaxRequestsBlur"
          />
        </div>
      </div>
    </div>

    <div class="field">
      <label>{{ $t("team.student", 1) }}</label>
      <div class="two fields">
        <div class="field">
          <input
            v-model="studentFirstname"
            :placeholder="$t('common.firstname')"
            type="text"
            @blur="handleStudentFirstnameBlur"
          />
        </div>
        <div class="field">
          <input
            v-model="studentLastname"
            :placeholder="$t('common.lastname')"
            type="text"
            @blur="handleStudentLastnameBlur"
          />
        </div>
      </div>
    </div>

    <div v-if="banks.length" class="grouped fields">
      <label>{{ $t("core.bank", 2) }}</label>
      <BaseCheckbox
        v-for="bank in banks"
        :key="bank.uuid"
        :value="bank.name"
        name="banks"
      />
    </div>

    <div class="ui fluid buttons">
      <button :disabled="isSubmitting" type="submit" class="ui olive button">
        {{ $t("common.search") }}
      </button>
      <button
        :disabled="isSubmitting"
        type="button"
        class="ui orange icon reset button"
        @click="onReset"
      >
        <i class="undo icon" />
      </button>
    </div>
  </form>
</template>

<style scoped>
.reset {
  flex: 0 0 auto !important;
}
</style>
