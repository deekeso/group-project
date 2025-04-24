import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const MIN_WAGER = 20
const MAX_WAGER = 500

export const useGameStore = defineStore('game', () => {
  const selectedNumbers = ref<number[]>([])
  const drawnNumbers = ref<number[]>([])
  const matchedNumbers = ref<number[]>([])
  const wager = ref<number>(MIN_WAGER)
  const bet = ref<number>(1)

  //autosave to local storage
  watch(
    [selectedNumbers, drawnNumbers, matchedNumbers, wager],
    () => {
      localStorage.setItem(
        'keno-game',
        JSON.stringify({
          selected: selectedNumbers.value,
          drawn: matchedNumbers.value,
          matches: matchedNumbers.value,
          wager: wager.value,
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
  }

  return {
    selectedNumbers,
    drawnNumbers,
    matchedNumbers,
    wager,
    bet,
    MIN_WAGER,
    MAX_WAGER,
    increaseWager,
    decreaseWager,
    setDrawnNumbers,
    resetGame,
    loadFromStorage,
    doubleWager
  }
})
