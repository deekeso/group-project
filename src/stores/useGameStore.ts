import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useGameStore = defineStore('game', () => {
  const selectedNumbers = ref<number[]>([])
  const drawnNumbers = ref<number[]>([])
  const matchedNumbers = ref<number[]>([])
  const balance = ref<number>(3000) // defined balance for now

  //autosave to local storage
<<<<<<< HEAD
  watch([selectedNumbers, drawnNumbers, matchedNumbers], () => {
    localStorage.setItem(
      'keno-game',
      JSON.stringify({
        selected: selectedNumbers.value,
        drawn: matchedNumbers.value,
        matches: matchedNumbers.value,
      }),
    )
  })
=======
  watch(
    [selectedNumbers, drawnNumbers, matchedNumbers, balance],
    () => {
      localStorage.setItem(
        'keno-game',
        JSON.stringify({
          selected: selectedNumbers.value,
          drawn: drawnNumbers.value,
          matches: matchedNumbers.value,
          balance: balance.value,
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
      balance.value = parsed.balance
    }
  }

  function setDrawnNumbers(numbers: number[]) {
    drawnNumbers.value = numbers
    matchedNumbers.value = numbers.filter((n) => selectedNumbers.value.includes(n))
  }

  function clearGame() {
    selectedNumbers.value = []
    drawnNumbers.value = []
    matchedNumbers.value = []

    localStorage.removeItem('drawnNumbers')
    localStorage.removeItem('selectedNumbers')
    localStorage.removeItem('matchedNumbers')
  }

  return {
    selectedNumbers,
    drawnNumbers,
    matchedNumbers,
    balance,
    setDrawnNumbers,
    clearGame,
    loadFromStorage,
  }
>>>>>>> e1de5c5c75870d56a3747a822d85fc875b452853
})
