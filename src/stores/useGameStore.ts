import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useGameStore = defineStore('game', () => {
  const selectedNumbers = ref<number[]>([])
  const drawnNumbers = ref<number[]>([])
  const matchedNumbers = ref<number[]>([])

  //autosave to local storage
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
})
