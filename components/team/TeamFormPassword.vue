<script setup lang="ts">
import { Team } from "@hennihaus/bamconfigbackend";

const { t } = useBaseI18n();
const config = useAppConfig();
const team = useFormValues<Team>();

const {
  value: password,
  errors: passwordErrors,
  handleBlur: handlePasswordBlur,
} = useField<string>(
  "password",
  {
    required: true,
    min: config.passwordLength,
    max: 50,
    unique_password: {
      uuid: team.value.uuid,
    },
  },
  { label: t("team.password") }
);

const onGeneratePassword = () => {
  let text = "";
  for (let i = 0; i < config.passwordLength; i++) {
    text = `${text}${config.passwordSequence.charAt(
      Math.floor(Math.random() * config.passwordSequence.length)
    )}`;
  }
  password.value = text;
};
</script>

<template>
  <div class="field">
    <label>{{ $t("team.password") }}</label>
    <div class="ui action input left corner labeled">
      <input v-model="password" type="text" @blur="handlePasswordBlur" />
      <div class="ui left corner label">
        <i class="asterisk icon" />
      </div>
      <button type="button" class="ui button" @click="onGeneratePassword">
        {{ $t("common.generate") }}
      </button>
    </div>
    <BaseFormMessage :errors="passwordErrors" />
  </div>
</template>
