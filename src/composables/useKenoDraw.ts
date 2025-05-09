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

  let i = 0
  function drawPredefinedNumber(drawSize: number, maxNumber: number): void {
    // gameStore.selectedNumbers
    if (drawnNumbers.value.length >= drawSize) {
      resetDraw()
    }

    // Generate a random number between 1 and maxNumber
    const randomNumber = drawSelectedNumbers(drawSize, maxNumber)

    // Add the drawn number to the list
    drawnNumbers.value.push(randomNumber)
    gameStore.setDrawnNumbers([...drawnNumbers.value])
    if (drawnNumbers.value.length >= drawSize) {
      i = 0
    }
  }

  function drawSelectedNumbers(drawSize: number, maxNumber: number) {

    if (i >= gameStore.cards[0].selectedNumbers.length) {
      let randomNumber = Math.floor(Math.random() * maxNumber) + 1
      while (drawnNumbers.value.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * maxNumber) + 1
      }
      return randomNumber
    }

    let result = 1;
    if (i >= gameStore.cards[0].selectedNumbers.length) {
      result = Math.floor(Math.random() * maxNumber) + 1
    } else {
      result = gameStore.cards[0].selectedNumbers[i++] as number
    }
    return result
  }

  function drawSpecificNumber(n: number): void {
    // Add the drawn number to the list
    drawnNumbers.value.push(n)
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

  function classicKenoDraw(predefined?: boolean) {
    if (predefined) return drawPredefinedNumber(20, 80)
      return drawNumber(20, 80)
  }

  function miniKenoDraw(predefined?: boolean) {
if (predefined) return drawPredefinedNumber(10, 49)
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
    drawSpecificNumber,
  }
}
