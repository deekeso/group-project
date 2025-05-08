import { RouletteItems } from "@/types"

export default function useUtils() {
  function calculateAge(bd: Date): number {
    const birthDate = new Date(bd)
    const today = new Date()
    let calculatedAge = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--
    }

    return calculatedAge
  }

  /**
   * Calculates the payout for the `Roulette of Recovery`.
   * @param {RouletteItems} rouletteResult - Represents the randomly chosen item from spinning the roulette.
   * @param {number} cumulativeWagerLoss - Represents the cumulative wager throughout the losestreak. For example,
   * the player waged P50 for 20 consecutive losses. Therefore, the cumulative wager loss should be P1,000 (P50*20).
   */
  function calculateRoulettePayout(rouletteResult: string, cumulativeWagerLoss: number): number {

    let payout = 0
    switch(rouletteResult) {
      case RouletteItems.OneTwenty:
        payout = cumulativeWagerLoss * 1.20
        break
      case RouletteItems.OneHundred:
        payout = cumulativeWagerLoss * 1.00
        break
      case RouletteItems.Fifty:
        payout = cumulativeWagerLoss * 0.50
        break
      case RouletteItems.TwentyFive:
        payout = cumulativeWagerLoss * 0.25
        break
    }

    return payout

  }

  return {
    calculateAge,
    calculateRoulettePayout
  }
}
