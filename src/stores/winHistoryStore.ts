import { defineStore } from 'pinia'

export const useWinHistoryStore = defineStore('winHistory', {
  state: () => ({
    history:  { round: Number, winner: String },
  }),
  actions: {
    addWin(round: number, winner: string) {
      this.history.push({ round, winner })
    },
    clearHistory() {
      this.history = []
    },
  },
})
