import { GameMode } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref, toRaw, watch } from 'vue'

const MIN_WAGER = 20
const MAX_WAGER = 500
const LOSE_STREAK_THRESHOLD = 20

export const useGameStore = defineStore(
  'game',
  () => {
    const selectedNumbers = ref<number[]>([])
    const drawnNumbers = ref<number[]>([])
    const matchedNumbers = ref<number[]>([])
    const wager = ref<number>(MIN_WAGER)
    const bet = ref<number>(1)
    const winnings = ref<number>(0)
    const result = ref<'win' | 'lose' | ''>('')
    const mode = ref<GameMode>(GameMode.Classic)
    const loseStreak = ref(0)
    const cumulativeLoseStreakWager = ref(0)


    let loseStreakCallback: () => void = function () {}
    let matchCallback: (i: number) => void = function () {}

  //states for card purchase
  const hasPurchasedCards = ref<boolean>(false)
  const purchaseMode = ref<'single' | 'multiple'>()
  const numberOfCards = ref<number>(0)

  //card state
  const cards = ref<
    Array<{
      selectedNumbers: number[]
      matchedNumbers: number[]
      multiplier?: number
      winnings: number
      result: 'win' | 'lose' | ''
    }>
  >([])
  const watchedMatchedNumbers = computed(() =>
    cards.value.map((card) => structuredClone(toRaw(card.matchedNumbers))),
  )

  //result states
  const hasWin = ref<boolean>(false)
  const totalWins = ref(0)

  // autosave to local storage
  watch(
    [
      selectedNumbers,
      drawnNumbers,
      matchedNumbers,
      wager,
      mode,
      hasPurchasedCards,
      purchaseMode,
      numberOfCards,
      cards,
    ],
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
          loseStreak: loseStreak.value,
          hasPurchasedCards: hasPurchasedCards.value,
          purchaseMode: purchaseMode.value,
          numberOfCards: numberOfCards.value,
          cards: cards.value,
        }),
      )
    },
    { deep: true },
  )


  watch(
    watchedMatchedNumbers,
    (newVal, oldVal) => {
      // Flatten arrays for comparison
      const newTotalMatches = newVal.flat().length
      const oldTotalMatches = oldVal.flat().length

      if (newTotalMatches > 0 && newTotalMatches !== oldTotalMatches) {
        matchCallback(newTotalMatches)
      }
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
        loseStreak.value = parsed.loseStreak

      hasPurchasedCards.value = parsed.hasPurchasedCards || false
      purchaseMode.value = parsed.purchaseMode || 'single'
      numberOfCards.value = parsed.numberOfCards || 1

      cards.value = parsed.cards || []
    }
  }

  function initializeCards() {
    cards.value = Array.from({ length: numberOfCards.value }, () => ({
      selectedNumbers: [],
      matchedNumbers: [],
      multiplier: 0,
      winnings: 0,
      result: '',
    }))
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

    function halfWager() {
      const newWager = Math.floor(wager.value / 2)
      wager.value = Math.max(newWager, MIN_WAGER)
    }

  function setDrawnNumbers(numbers: number[]) {
    drawnNumbers.value = numbers

    //modified to detect match per card
    cards.value = cards.value.map((card) => ({
      ...card,
      matchedNumbers: numbers.filter((n) => card.selectedNumbers?.includes(n)),
    }))
  }

  function resetCard(cardIndex: number) {
    cards.value[cardIndex] = {
      selectedNumbers: [],
      matchedNumbers: [],
      winnings: 0,
      result: '',
    }
    drawnNumbers.value = []
  }

  function resetGame(preserveSelectedNumbers: boolean = false) {
    if (!preserveSelectedNumbers) {
      selectedNumbers.value = []
    }

    //reset all cards
    cards.value = cards.value.map((card) => ({
      // selectedNumbers: preserveSelectedNumbers ? card.selectedNumbers : [],
      selectedNumbers: preserveSelectedNumbers ? card.selectedNumbers : [],
      matchedNumbers: [],
      winnings: 0,
      result: '',
    }))
    drawnNumbers.value = []
  }

    //mode switcher
    function setGameMode(newMode: GameMode) {
      if (mode.value !== newMode) {
        resetGame()
      }

      // Handle trimming after reset so selectedNumbers is guaranteed fresh
      if (newMode === 'mini' && selectedNumbers.value.length > 10) {
        selectedNumbers.value = selectedNumbers.value.slice(0, 10)
      }

      mode.value = newMode
    }

    function addWinnings(amount: number) {
      winnings.value = amount
    }

    function setResult(status: 'win' | 'lose') {
      if (status === 'lose') {
        loseStreak.value++
        if (loseStreak.value >= LOSE_STREAK_THRESHOLD) {
          loseStreak.value = 0
          loseStreakCallback()
        }
      }
      
      if (status === 'win') {
        loseStreak.value = 0
        cumulativeLoseStreakWager.value = 0
      }

      result.value = status
    }

    function setLoseStreakCallback(callback: () => void) {
      loseStreakCallback = callback
    }

    function setMatchCallback(callback: (i: number) => void) {
      matchCallback = callback
    }

    function resetWinnings() {
      winnings.value = 0
    }

    function makePurchase(mode: 'single' | 'multiple', number: number) {
      hasPurchasedCards.value = true
      purchaseMode.value = mode
      numberOfCards.value = mode === 'multiple' ? number : 1
    }

  function resetPurchase() {
    hasPurchasedCards.value = false
    purchaseMode.value = 'single'
    numberOfCards.value = 1
  }

    function setLostStreak(count: number) {
      loseStreak.value = count
    }

    function increaseCumulativeLoseStreakWager(latestWager: number) {
      cumulativeLoseStreakWager.value += latestWager
    }

    function resetCumulativeLoseStreakWager() {
      cumulativeLoseStreakWager.value = 0
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
    loseStreak,
    hasPurchasedCards,
    purchaseMode,
    numberOfCards,
    cards,
    hasWin,
    totalWins,
    initializeCards,
    increaseWager,
    decreaseWager,
    setDrawnNumbers,
    resetGame,
    loadFromStorage,
    doubleWager,
    halfWager,
    setGameMode,
    addWinnings,
    setResult,
    resetWinnings,
    setLoseStreakCallback,
    setMatchCallback,
    makePurchase,
    resetPurchase,
    resetCard,
    setLostStreak,
    increaseCumulativeLoseStreakWager,
    resetCumulativeLoseStreakWager,
  }
},
{
  persist: {
    key: 'keno-game',
    storage: localStorage,
  } as any,
},)
