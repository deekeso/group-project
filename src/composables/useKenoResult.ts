import { computed } from 'vue'
import paytable from '../components/PayTable/payTable.json'
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/stores/wallet'

export function useKenoResult(mode: 'mini' | 'classic') {
  const kenoPayout = paytable as Paytable
  const kenoTable = computed<PaytableEntry[]>(() => kenoPayout[mode])

  const gameStore = useGameStore()
  const walletStore = useWalletStore()
  const { selectedNumbers, matchedNumbers, wager, cards } = storeToRefs(gameStore)

  //find the paytable row for the number of selected numbers
  // const tableEntry = computed(() => {
  //   const selectionLength = selectedNumbers.value.length
  //   return kenoTable.value[selectionLength - 1] // paytable is 0-indexed
  // })

  // Compute paytable entry per card based on its selected number count
  const tableEntries = computed(() =>
    cards.value.map((card) => {
      const selectionLength = card.selectedNumbers.length
      return kenoTable.value[selectionLength - 1] // paytable is 0-indexed
    }),
  )

  // Get the win value based on number of matched numbers
  // const winValue = computed(() => {
  //   const entry = tableEntry.value
  //   return entry.values[matchedNumbers.value.length]
  // })

  // Compute win multiplier per card based on how many matched numbers it got
  const winValues = computed(() =>
    cards.value.map((card, index) => {
      const entry = tableEntries.value[index]
      return entry?.values[card.matchedNumbers.length] ?? 0
    }),
  )

  function evaluateGame() {
    cards.value.forEach((card, index) => {
      const isWin = winValues.value[index] > 0
      card.result = isWin ? 'win' : 'lose' // Directly mutate the object
      console.log('card result', card.result)
    })
  }

  function calculatePayout() {
    cards.value.forEach((card, index) => {
      const multiplier = winValues.value[index]
      const winnings = wager.value * multiplier

      if (multiplier > 0) {
        walletStore.addPayout(winnings)
      } else {
        walletStore.deductLostBet(wager.value)
      }

      card.winnings = winnings // Directly assign winnings
      console.log('multiplier', multiplier)
      console.log('wager', wager.value)
      console.log('winnings', card.winnings)
    })
  }

  return {
    evaluateGame,
    calculatePayout,
  }
}

export interface PaytableEntry {
  hits: string[]
  zeros: number[]
  values: number[]
}

export interface Paytable {
  mini: PaytableEntry[]
  classic: PaytableEntry[]
}
