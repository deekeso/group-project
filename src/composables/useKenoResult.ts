import { computed } from 'vue'
import { useGameStore } from '@/stores/useGameStore'
import paytable from '../components/PayTable/payTable.json'

export function useKenoResult() {
  const game = useGameStore()

  const totalSelected = computed(() => game.selectedNumbers.length)
  const hits = computed(() => game.matchedNumbers.length)
  const currentPaytable = computed(() => paytable[game.mode])

  // Find the correct paytable row based on how many numbers the user selected
  function getPayEntry(): number | null {
    const table = currentPaytable.value
    if (!table) return null

    // Find entry that matches the selected amount
    const entry = table.find((p) => p.zeros.includes(totalSelected.value - 1))
    if (!entry) return 0

    // Use matched count (hits) directly as index
    const payout = entry.values[hits.value] ?? 0
    return payout
  }

  function evaluateGame() {
    const payout = getPayEntry() ?? 0
    const winnings = payout * game.wager
    const isWin = winnings > 0

    game.addWinnings(winnings)
    game.setResult(isWin ? 'win' : 'lose')

    return {
      payout,
      winnings,
      result: isWin ? 'win' : 'lose',
    }
  }

  return {
    evaluateGame,
  }
}
