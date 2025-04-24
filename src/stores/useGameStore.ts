import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type GameMode = 'classic' | 'mini'

export const useGameStore = defineStore('game', () => {
  const selectedNumbers = ref<number[]>([])
  const drawnNumbers = ref<number[]>([])
  const matchedNumbers = ref<number[]>([])
  const wager = ref<number>(20)
  const bet = ref<number>(1)
  const winnings = ref<number>(0)
  const result = ref<'win' | 'lose' | ''>('')
  const mode = ref<GameMode>('classic') // NEW: game mode

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
    const maxWager = 500
    if (wager.value < maxWager) wager.value++
  }

  function decreaseWager() {
    const minWager = 20
    if (wager.value > minWager) wager.value--
  }

  function setDrawnNumbers(numbers: number[]) {
    drawnNumbers.value = numbers
    matchedNumbers.value = numbers.filter((n) => selectedNumbers.value.includes(n))
  }

  function resetGame() {
    selectedNumbers.value = []
    drawnNumbers.value = []
    matchedNumbers.value = []
  }

  // NEW: change mode
  function setGameMode(newMode: GameMode) {
    mode.value = newMode
    // resetGame() // optional: reset when changing mode
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

  return {
    selectedNumbers,
    drawnNumbers,
    matchedNumbers,
    wager,
    bet,
    winnings,
    result,
    mode,
    increaseWager,
    decreaseWager,
    setDrawnNumbers,
    resetGame,
    loadFromStorage,
    setGameMode,
    addWinnings,
    setResult,
    resetWinnings,
  }
})
