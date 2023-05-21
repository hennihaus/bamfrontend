<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = defineProps<{ uuid: string }>();

const positiveMessageType = MessageType.POSITIVE;

const { bank, message, updateBank, saveStatistics, deleteStatistics } =
  await useBankFetch(toRef(props, "uuid"));
const { isAsyncBankActive, isAsyncBankNotActive } = useBank(bank);

const onDeactivateClick = () => updateBank({ ...bank.value, isActive: false });
const onActivateClick = () => updateBank({ ...bank.value, isActive: true });
</script>

<template>
  <template v-if="bank">
    <BankDetailsView :bank="bank" />

    <button
      v-if="isAsyncBankActive"
      class="ui tiny red labeled icon button"
      @click="onDeactivateClick"
    >
      <i class="power off icon" /> {{ $t("bank.deactivate") }}
    </button>

    <button
      v-if="isAsyncBankNotActive"
      class="ui tiny green labeled icon button"
      @click="onActivateClick"
    >
      <i class="power off icon" /> {{ $t("bank.activate") }}
    </button>

    <NuxtLink :to="{ name: 'BanksEdit', params: { uuid } }">
      <button class="ui tiny yellow labeled icon button">
        <i class="write icon" />
        {{ $t("bank.edit", { bank: $t("core.bank", 1) }) }}
      </button>
    </NuxtLink>

    <button
      v-if="bank.isAsync"
      class="ui tiny olive labeled icon button"
      @click="saveStatistics(uuid)"
    >
      <i class="arrow up icon" /> {{ $t("bank.add-teams") }}
    </button>

    <button
      v-if="bank.isAsync"
      class="ui tiny orange labeled icon button"
      @click="deleteStatistics(uuid)"
    >
      <i class="remove icon" /> {{ $t("bank.remove-teams") }}
    </button>

    <BaseMessage
      v-if="message"
      :message="message"
      :type="positiveMessageType"
    />
  </template>
</template>
