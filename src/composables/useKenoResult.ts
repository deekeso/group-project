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
  const { wager, cards, hasWin, totalWins } = storeToRefs(gameStore)

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
      const result = isWin ? 'win' : 'lose'
      gameStore.setResult(result)
      card.result = result
    })
  }

  // determine if a round has a winning card
  function evaluateRound() {
    if (winValues.value.some((win) => win > 0)) {
      hasWin.value = true
    } else {
      hasWin.value = false
    }
  }

  // Apply payout or deduct wager per card
  function calculatePayout() {
    let totalWinnings = 0

    cards.value.forEach((card, index) => {
      const multiplier = winValues.value[index]
      const winnings = wager.value * multiplier

      if (multiplier > 0) {
        // Add win to wallet
        totalWinnings += winnings
        // performTransaction(TransactionOperation.Payout, winnings)
      }

      card.winnings = winnings
      card.multiplier = multiplier
    })
    evaluateRound()

    totalWins.value = totalWinnings

    //Add total winnings to wallet instead of having one transaction per card
    if (totalWinnings > 0) performTransaction(TransactionOperation.Payout, totalWinnings)
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
