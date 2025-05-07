import { computed } from 'vue'
import paytable from '../components/PayTable/payTable.json'
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
// import { useWalletStore } from '@/stores/wallet'
import { TransactionOperation } from '@/types'

export function useKenoResult(mode: 'mini' | 'classic') {
  const kenoPayout = paytable as Paytable
  const kenoTable = computed<PaytableEntry[]>(() => kenoPayout[mode])

  const { performTransaction } = useAuthStore()
  const gameStore = useGameStore()
  // const walletStore = useWalletStore()
  const { wager, cards } = storeToRefs(gameStore)

  // Compute paytable entry per card based on its selected number count
  const tableEntries = computed(() =>
    cards.value.map((card) => {
      const selectionLength = card.selectedNumbers.length
      return kenoTable.value[selectionLength - 1] // paytable is 0-indexed
    }),
  )

  // Compute win multiplier per card based on how many matched numbers it got
  const winValues = computed(() =>
    cards.value.map((card, index) => {
      const entry = tableEntries.value[index]
      return entry?.values[card.matchedNumbers.length] ?? 0
    }),
  )

  // Determine 'win' or 'lose' for each card
  function evaluateGame() {
    cards.value.forEach((card, index) => {
      const isWin = winValues.value[index] > 0
      card.result = isWin ? 'win' : 'lose'
      console.log(`Card ${index + 1} result: ${card.result}`)
    })
  }

  // Apply payout or deduct wager per card
  function calculatePayout() {
    cards.value.forEach((card, index) => {
      const multiplier = winValues.value[index]
      const winnings = wager.value * multiplier

      if (multiplier > 0) {
        // Add win to wallet
        performTransaction(TransactionOperation.Payout, winnings)
        // walletStore.addPayout(winnings)
      } else {
        // Deduct shared wager for losing card
        // walletStore.deductLostBet(wager.value)
        performTransaction(TransactionOperation.Wage, wager.value)
      }

      card.winnings = winnings
      console.log(`Card ${index + 1}: result=${card.result}, winnings=${card.winnings}`)
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
