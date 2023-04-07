<script setup lang="ts">
definePageMeta({
  redirect: () => {
    const LANGUAGE_CODE_LENGTH = 2;

    const locale =
      navigator.language?.length > LANGUAGE_CODE_LENGTH
        ? navigator.language.slice(0, LANGUAGE_CODE_LENGTH)
        : navigator.language;

    return {
      path: locale,
    };
  },
});
</script>
