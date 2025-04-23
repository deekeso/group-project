import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useGameStore = defineStore('game', () => {
  const selectedNumbers = ref<number[]>([])
  const drawnNumbers = ref<number[]>([])
  const matchedNumbers = ref<number[]>([])
  const wager = ref<number>(20)
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

  return {
    selectedNumbers,
    drawnNumbers,
    matchedNumbers,
    wager,
    bet,
    increaseWager,
    decreaseWager,
    setDrawnNumbers,
    resetGame,
    loadFromStorage,
  }
})
