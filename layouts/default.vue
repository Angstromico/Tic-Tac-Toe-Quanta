<script setup lang="ts">
const { locale, setLocale } = useI18n()
import mainImage from '/quantaToe.png'

useSeoMeta({
  title: 'Tic tac toe from Quanta',
  ogTitle: 'Tic tac toe from Quanta',
  description: 'An add for the Tic tac toe game on Nuxt',
  ogDescription: 'An add for the Tic tac toe game on Nuxt',
  ogImage: mainImage,
  twitterCard: 'summary_large_image',
  twitterImage: mainImage,
  ogUrl: 'https://tic-tac-memz.com/',
  twitterUrl: 'https://tic-tac-memz.com',
  twitterTitle: 'Tic tac toe from Quanta',
  twitterDescription: 'An add for the Tic tac toe game on Nuxt',
})
useHead({
  htmlAttrs: {
    lang: locale.value,
  },
})
</script>
<template>
  <slot />
</template>
