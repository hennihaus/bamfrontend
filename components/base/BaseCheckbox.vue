<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = defineProps<{ value: string; name: string }>();

const { checked, handleBlur, handleChange } = useField<string>(
  toRef(props, "name"),
  {},
  {
    type: "checkbox",
    checkedValue: props.value,
    syncVModel: false,
    validateOnValueUpdate: false,
  }
);
</script>

<template>
  <div class="field">
    <div class="ui checkbox">
      <input
        :checked="checked ?? false"
        type="checkbox"
        @click="handleChange(value, false)"
        @blur="handleBlur"
      />
      <label>{{ value }}</label>
    </div>
  </div>
</template>
