import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type GameMode = 'classic' | 'mini'

const MIN_WAGER = 20
const MAX_WAGER = 500

export const useGameStore = defineStore('game', () => {
  const selectedNumbers = ref<number[]>([])
  const drawnNumbers = ref<number[]>([])
  const matchedNumbers = ref<number[]>([])
  const wager = ref<number>(MIN_WAGER)
  const bet = ref<number>(1)
  const winnings = ref<number>(0)
  const result = ref<'win' | 'lose' | ''>('')
  const mode = ref<GameMode>('classic') // NEW: game mode
  const isPlaying = ref<boolean>(false)

  // autosave to local storage
  watch(
    [selectedNumbers, drawnNumbers, matchedNumbers, wager, mode],
    () => {
      localStorage.setItem(
        'keno-game',
        JSON.stringify({
          selected: selectedNumbers.value,
          drawn: drawnNumbers.value,
          matched: matchedNumbers.value,
          wager: wager.value,
          winnings: winnings.value,
          result: result.value,
          mode: mode.value,
        }),
      )
    },
    { deep: true },
  )

  // load from local storage
  function loadFromStorage() {
    const saved = localStorage.getItem('keno-game')

    if (saved) {
      const parsed = JSON.parse(saved)
      selectedNumbers.value = parsed.selected || []
      drawnNumbers.value = parsed.drawn || []
      matchedNumbers.value = parsed.matched || []
      wager.value = parsed.wager || 20
      winnings.value = parsed.winnings || 0
      result.value = parsed.result || ''
      mode.value = parsed.mode || 'classic'
    }
  }

  // wager counter
  function increaseWager() {
    if (wager.value < MAX_WAGER) wager.value++
  }

  function decreaseWager() {
    if (wager.value > MIN_WAGER) wager.value--
  }

  function doubleWager() {
    const newWager = wager.value * 2
    wager.value = newWager >= MAX_WAGER ? MAX_WAGER : newWager
  }

  function setDrawnNumbers(numbers: number[]) {
    drawnNumbers.value = numbers
    matchedNumbers.value = numbers.filter((n) => selectedNumbers.value.includes(n))
  }

  function resetGame() {
    selectedNumbers.value = []
    drawnNumbers.value = []
    matchedNumbers.value = []
    winnings.value = 0
  }

  //mode switcher
  function setGameMode(newMode: GameMode) {
    if (mode.value != newMode) resetGame()
    mode.value = newMode
  }

  function addWinnings(amount: number) {
    winnings.value += amount
  }

  function setResult(status: 'win' | 'lose') {
    result.value = status
  }

  function resetWinnings() {
    winnings.value = 0
  }

  function isPlayingToggle() {
    isPlaying.value = !isPlaying.value
  }

  return {
    selectedNumbers,
    drawnNumbers,
    matchedNumbers,
    wager,
    bet,
    MIN_WAGER,
    MAX_WAGER,
    winnings,
    result,
    mode,
    isPlaying,
    increaseWager,
    decreaseWager,
    setDrawnNumbers,
    resetGame,
    loadFromStorage,
    doubleWager,
    setGameMode,
    addWinnings,
    setResult,
    resetWinnings,
    isPlayingToggle,
  }
})
