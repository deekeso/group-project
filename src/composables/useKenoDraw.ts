import { useGameStore } from '@/stores/useGameStore'
import { ref } from 'vue'

// Composable to handle Keno drawing logic
export function useKenoDraw() {
  const gameStore = useGameStore()
  // Reactive state for the drawn numbers
  const drawnNumbers = ref<number[]>([])

  // Maximum number in the Keno game
  const maxNumber = 49

  // Function to draw a random number (without duplicates)
  function drawNumber(): void {
    if (drawnNumbers.value.length >= maxNumber) {
      return // All numbers have been drawn, can't draw more
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

  // Function to reset the drawn numbers
  function resetDraw(): void {
    drawnNumbers.value = []
    gameStore.setDrawnNumbers([])
  }

  return {
    drawnNumbers,
    drawNumber,
    resetDraw,
  }
}
