interface Window {
  loadRoulette: (items: string[], width: number, height: number) => void
  spinRoulette: (callback: (item: string) => void) => string
}