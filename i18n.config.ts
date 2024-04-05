export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      title: 'Tic Tac Toe Game',
      reset: 'RESET',
      startGame: 'Start Game',
    },
    es: {
      title: 'Juego del Gato',
      reset: 'REINICIAR',
      startGame: 'Comenzar',
    },
  },
}))
