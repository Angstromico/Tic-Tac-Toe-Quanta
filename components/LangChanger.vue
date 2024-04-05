<script setup lang="ts">
const { locale, setLocale } = useI18n()
</script>

<template>
  <div class="langChanger">
    <span @click="setLocale('en')" :class="{ chosen: locale === 'en' }"
      >en</span
    >
    |
    <span @click="setLocale('es')" :class="{ chosen: locale === 'es' }"
      >es</span
    >
  </div>
</template>

<style scoped>
.langChanger {
  @apply flex w-24 justify-around gap-3;
  span {
    @apply font-bold text-lg cursor-pointer opacity-65 transition-all;
    &.chosen {
      @apply opacity-100;
    }
  }
}
</style>
