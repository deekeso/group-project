import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// Composable to handle Keno drawing logic
export function useKenoDraw() {
  const gameStore = useGameStore()
  const { cards } = storeToRefs(gameStore)

  // Reactive state for the drawn numbers
  const drawnNumbers = ref<number[]>([])
  const autopickedNumbers = ref<number[]>([])

  // Maximum number in the Keno game
  // const maxNumber = 49

  // Function to draw a random number (without duplicates)
  function drawNumber(drawSize: number, maxNumber: number): void {
    if (drawnNumbers.value.length >= drawSize) {
      resetDraw()
    }

    // Generate a random number between 1 and maxNumber
    let randomNumber = Math.floor(Math.random() * maxNumber) + 1

    // Ensure the number isn't already drawn
    while (drawnNumbers.value.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * maxNumber) + 1
    }

    // Add the drawn number to the list
    drawnNumbers.value.push(randomNumber)
    gameStore.setDrawnNumbers([...drawnNumbers.value])
  }

  function autopickNumber(autopickSize: number, maxNumber: number, cardIndex: number): void {
    if (autopickedNumbers.value.length >= autopickSize) {
      resetAutopicked(cardIndex)
    }

    // Generate a random number between 1 and maxNumber
    let randomNumber = Math.floor(Math.random() * maxNumber) + 1

    // Ensure the number isn't already drawn
    while (autopickedNumbers.value.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * maxNumber) + 1
    }

    // Add the drawn number to the list
    autopickedNumbers.value.push(randomNumber)
    cards.value[cardIndex].selectedNumbers = [...autopickedNumbers.value]
  }

  function classicKenoDraw() {
    return drawNumber(20, 80)
  }

  function miniKenoDraw() {
    return drawNumber(10, 49)
  }

  function kenoAutopick(autopickSize: number, type: 'classic' | 'mini', cardIndex: number) {
    return autopickNumber(
      autopickSize,
      type === 'classic' ? 80 : type === 'mini' ? 49 : 80,
      cardIndex,
    )
  }

  // Function to reset the drawn numbers
  function resetDraw(): void {
    drawnNumbers.value = []
    gameStore.setDrawnNumbers([])
  }

  function resetAutopicked(cardIndex: number) {
    autopickedNumbers.value = [] = []
    cards.value[cardIndex].selectedNumbers = []
    resetDraw()
  }

  return {
    drawnNumbers,
    classicKenoDraw,
    miniKenoDraw,
    kenoAutopick,
    resetDraw,
    resetAutopicked,
  }
}
