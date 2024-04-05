<script setup lang="ts">
interface Props {
  sounds: boolean
}

const props = defineProps<Props>()
const soundActive = ref(props.sounds)
const emit = defineEmits(['changeSounds'])
const toggleSound = () => {
  soundActive.value = !soundActive.value
  emit('changeSounds', soundActive.value)
}
</script>

<template>
  <div class="btn-container">
    <img
      @click="toggleSound"
      src="/Waves.png"
      :class="{ unactive: !soundActive }"
      alt="waves"
    />
    <LangChanger />
  </div>
</template>

<style scoped lang="scss">
.btn-container {
  @apply absolute right-[5%] top-[5%] flex flex-col justify-center items-center gap-4;
  img {
    @apply w-12 h-12 cursor-pointer z-50;
    &.unactive {
      @apply opacity-50;
    }
  }
}
</style>
