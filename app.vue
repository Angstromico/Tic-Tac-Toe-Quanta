<script setup lang="ts">
import { useSound } from '@vueuse/sound'
import buttonSound from '/ball.wav'
import windSound from '/win.wav'
const { locale } = useI18n()

const { play: playBtn } = useSound(buttonSound)
const { play: winPlay } = useSound(windSound)
type XO = 'X' | 'O' | ''
const valueXO = ref<XO>('X')
const boxes = ref<XO[]>(['', '', '', '', '', '', '', '', ''])
const gameOver = ref(false)
const goldenPath = ref<number[]>([9, 9, 9])
const counter = ref(0)
const startGame = ref(true)
const soundsActive = ref(false)
const newXO = () => {
  if (valueXO.value === 'X') {
    valueXO.value = 'O'
    return
  }
  valueXO.value = 'X'
}
const playSound = (sound: any) => {
  if (soundsActive.value) sound()
}
const addXO = (i: number) => {
  const boxesArr = [...boxes.value]
  boxesArr[i] = valueXO.value
  boxes.value = boxesArr
  counter.value = counter.value + 1
  playSound(playBtn)
  newXO()
  checkWinner()
}
const resetGame = () => {
  boxes.value = ['', '', '', '', '', '', '', '', '']
  gameOver.value = false
  goldenPath.value = [9, 9, 9]
  counter.value = 0
}
const winPatters = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const victoryPath = (first: number, second: number, third: number) => {
  const XOs = [first, second, third]
  //I want to become golde the buttons on the winner line
  goldenPath.value = XOs
  playSound(winPlay)
  gameOver.value = true
}

function checkWinner() {
  winPatters.forEach((pattern) => {
    const first = boxes.value[pattern[0]]
    const second = boxes.value[pattern[1]]
    const third = boxes.value[pattern[2]]
    if (first === 'X' && second === 'X' && third === 'X')
      victoryPath(pattern[0], pattern[1], pattern[2])
    if (first === 'O' && second === 'O' && third === 'O')
      victoryPath(pattern[0], pattern[1], pattern[2])
  })
}
const winnerMsg = computed(() => {
  const winner = valueXO.value === 'X' ? 'O' : 'X'
  const msgW =
    locale.value === 'en'
      ? `The winner is ${winner}!`
      : `El ganador es ${winner}!`
  const msgDraw =
    locale.value === 'en' ? 'The game is a draw!' : 'El juego quedo empatado!'
  return gameOver.value ? msgW : msgDraw
})
const beginGame = (start: boolean) => (startGame.value = start)
const changeSounds = (sound: boolean) => (soundsActive.value = sound)
</script>

<template>
  <NuxtLayout>
    <Intro :start="startGame" @start-game="beginGame" />
    <main v-if="!startGame" class="w-screen h-screen flexCenter relative">
      <SoundBtn :sounds="soundsActive" @change-sounds="changeSounds" />
      <div v-if="gameOver || (!gameOver && counter >= 9)" class="winner">
        <h2>{{ winnerMsg }}</h2>
      </div>
      <div class="flex gap-4 items-center">
        <h1 class="title">{{ $t('title') }}</h1>
        <img
          src="//qantamedia.com/wp-content/uploads/2020/09/QANTA-LOGO.png"
          alt="logo"
          class="logo"
        />
      </div>

      <section class="mainContainer">
        <div class="game">
          <button
            @click="addXO(i)"
            class="btn"
            :class="{ golden: goldenPath.includes(i) }"
            v-for="(box, i) in boxes"
            :key="i"
            :disabled="box === 'X' || box === 'O' || gameOver"
          >
            {{ box }}
          </button>
        </div>
      </section>
      <button @click="resetGame" class="reset">{{ $t('reset') }}</button>
    </main>
  </NuxtLayout>
</template>

<style lang="scss">
body {
  background: darken(#bfc0c0, 20%);
  @apply font-sans;
}
main {
  @apply z-20;
}
.title {
  @apply text-4xl lg:text-5xl font-bold text-center text-[#4f5d75];
}
.logo {
  @apply w-16 h-16 lg:w-24 lg:h-24;
}
.flexCenter {
  @apply flex justify-center items-center flex-col;
}
.btn {
  color: darken(#4f5d75, 8%);
  @apply w-16 h-16 md:w-32 md:h-32 text-5xl md:text-7xl font-bold bg-white rounded transition-none;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  &:disabled,
  &[disabled] {
    background: darken(#4f5d75, 15%);
    animation: fadeInText 2s forwards;
  }
  &.golden {
    @apply bg-[#FFD700];
  }
}
.mainContainer {
  @apply container mx-auto w-full flexCenter;
}
.game {
  @apply grid grid-cols-3 justify-center gap-3 items-center mx-auto mt-20;
}
.reset {
  @apply rounded mt-8 text-center px-5 py-3 bg-[#54536D] text-white font-bold text-2xl hover:bg-[#C6CE62] transition-all;
}
.winner {
  @apply absolute bottom-12 text-3xl md:text-4xl text-[#FFD700] font-black left-0 w-full text-center;
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInText {
  from {
    color: transparent;
  }
  to {
    color: white;
  }
}
</style>
