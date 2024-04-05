<script setup lang="ts">
const { locale, setLocale } = useI18n()
//Give me a lang changer between English and Spanish here on this component
interface Props {
  start: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['startGame'])
const startGame = () => emit('startGame', false)
const changeLanguage = (lang: string) => {
  setLocale(lang)
}
</script>

<template>
  <div class="intro" v-if="props.start">
    <div class="intro-content">
      <img
        src="//qantamedia.com/wp-content/uploads/2020/09/QANTA-LOGO.png"
        alt="Logo"
        class="logo"
      />
      <div class="language-switcher">
        <button
          @click="changeLanguage('en')"
          :class="{ active: locale === 'en' }"
        >
          English
        </button>
        <button
          @click="changeLanguage('es')"
          :class="{ active: locale === 'es' }"
        >
          Español
        </button>
      </div>
      <button @click="startGame" class="start-button">
        {{ $t('startGame') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: darken(#f0f0f0, 30%);
}

.intro-content {
  text-align: center;
  widows: 100%;
}

.logo {
  @apply w-full h-auto sm:w-96 sm:h-96;
  max-width: 600px;
  margin-bottom: 2rem;
}

.start-button {
  padding: 0.8rem 1.6rem;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-button:hover {
  background-color: #45a049;
}
.language-switcher {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.language-switcher button {
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.language-switcher button.active {
  background-color: #4caf50;
  color: white;
}
</style>
