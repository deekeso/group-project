import { computed, watch } from 'vue'
import paytable from '../components/PayTable/payTable.json'
import { useGameStore } from '@/stores/useGameStore'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '@/stores/wallet'

export function useKenoResult(mode: 'mini' | 'classic') {
  const kenoPayout = paytable as Paytable
  const kenoTable = computed<PaytableEntry[]>(() => kenoPayout[mode])

  const gameStore = useGameStore()
  const walletStore = useWalletStore()
  const { selectedNumbers, matchedNumbers, bet, wager } = storeToRefs(gameStore)

  //find the paytable row for the number of selected numbers
  const tableEntry = computed(() => {
    const selectionLength = selectedNumbers.value.length
    return kenoTable.value[selectionLength - 1] // paytable is 0-indexed
  })

  // Get the win value based on number of matched numbers
  const winValue = computed(() => {
    const entry = tableEntry.value
    return entry.values[matchedNumbers.value.length]
  })

  function evaluateGame() {
    const isWin = winValue.value > 0
    gameStore.setResult(isWin ? 'win' : 'lose')
  }

  function calculatePayout() {
    const payout = wager.value * winValue.value

    if (winValue.value <= 0) {
      walletStore.deductLostBet(wager.value)
      return
    }
    gameStore.addWinnings(payout)
    walletStore.addPayout(payout)
  }

  return {
    tableEntry,
    winValue,
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
