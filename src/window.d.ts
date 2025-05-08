interface Window {
  loadRoulette: (items: string[]) => void
  spinRoulette: (callback: (item: string) => void) => string
}