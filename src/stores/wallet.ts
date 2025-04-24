import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from './auth'

export const useWalletStore = defineStore('wallet', () => {
  const auth = useAuthStore()

  const balance = computed(() => {
    return auth.user?.balance ?? 0
  })

  function updateUserBalance(amount: number, operation: 'deposit' | 'withdraw') {
    if (!auth.user) return

    const index = auth.users.findIndex((u) => u.email === auth.user!.email)
    if (index === -1) return

    const currentBalance = auth.user.balance ?? 0
    const newBalance = operation === 'deposit' ? currentBalance + amount : currentBalance - amount

    // Update in user ref
    auth.user.balance = newBalance

    // Update in users array (persisted)
    auth.users[index].balance = newBalance
  }

  function deposit(amount: number) {
    updateUserBalance(amount, 'deposit')
  }

  function withdraw(amount: number) {
    const currentBalance = auth.user?.balance ?? 0
    if (amount > currentBalance) {
      throw new Error('Insufficient balance')
    }
    updateUserBalance(amount, 'withdraw')
  }

  function deductLostBet(amount: number) {
    try {
      withdraw(amount)
    } catch (error) {
      console.error('Failed to deduct bet:', error)
    }
  }

  function addPayout(amount: number) {
    updateUserBalance(amount, 'deposit')
  }

  return {
    balance,
    deposit,
    withdraw,
    deductLostBet,
    addPayout,
  }
})
