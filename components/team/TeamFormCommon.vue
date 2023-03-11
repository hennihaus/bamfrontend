<script setup lang="ts">
import {useField, useFormValues, useIsFormValid, useIsSubmitting} from "vee-validate";
import {Team} from "@hennihaus/bamconfigbackend";

const {t} = useBaseI18n();
const isSubmitting = useIsSubmitting();
const isFormValid = useIsFormValid();
const form = useFormValues<Team>();

const {
  value: username,
  errors: usernameErrors,
  handleBlur: handleUsernameBlur,
} = useField<string>(
    "username",
    {
      required: true,
      min: 6,
      max: 50,
      unique_username: {
        uuid: form.value.uuid,
      },
    },
    {label: t("team.username")}
);
const {
  value: jmsQueue,
  errors: jmsQueueErrors,
  handleBlur: handleJmsQueueBlur,
} = useField<string>(
    "jmsQueue",
    {
      required: true,
      min: 6,
      max: 50,
      unique_jms_queue: {
        uuid: form.value.uuid,
      },
    },
    {label: t("team.jms-queue")}
);
</script>

<template>
  <div class="two fields">
    <div class="field">
      <label>{{ $t("team.username") }}</label>
      <div class="ui left corner labeled input">
        <input v-model="username" type="text" @blur="handleUsernameBlur"/>
        <div class="ui left corner label">
          <i class="asterisk icon"/>
        </div>
      </div>
      <BaseFormMessage :errors="usernameErrors"/>
    </div>

    <div class="field">
      <label class="save">Invisible</label>
      <button
          :disabled="isSubmitting"
          :class="[isFormValid ? 'green' : 'red']"
          type="submit"
          class="ui fluid button"
      >
        {{ $t("common.save") }}
      </button>
    </div>
  </div>

  <div class="two fields">
    <div class="field">
      <label>{{ $t("team.jms-queue") }}</label>
      <div class="ui left corner labeled input">
        <input v-model="jmsQueue" type="text" @blur="handleJmsQueueBlur"/>
        <div class="ui left corner label">
          <i class="asterisk icon"/>
        </div>
      </div>
      <BaseFormMessage :errors="jmsQueueErrors"/>
    </div>

    <TeamFormPassword/>
  </div>
</template>

<style scoped>
.save {
  visibility: hidden;
}
</style>