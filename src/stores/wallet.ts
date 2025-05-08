import { TransactionOperation } from '@/types'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface Transaction {
  oldBalance: number
  operation: TransactionOperation
  amount: number
  newBalance: number
  timestamp: Date
}

export interface Wallet {
  id: string
  balance: number
  transactions: Transaction[]
}

export const useWalletsStore = defineStore('wallets', {
  state: () => ({
    wallets: [] as Wallet[],
  }),

  actions: {
    createWallet(): string {
      const id = uuidv4()
      let newWallet: Wallet = {
        id,
        balance: 0,
        transactions: [],
      }

      this.wallets.push(newWallet)
      return id
    },

    findWallet(id: string) {
      const foundWallet = this.wallets.find((wallet) => wallet.id === id)

      if (!foundWallet) {
        throw new Error('Wallet not found!')
      }

      return foundWallet
    },

    performTransaction(id: string, operation: TransactionOperation, amount: number): Transaction {
      const wallet = this.findWallet(id)

      const oldBalance = wallet.balance

      switch (operation) {
        case TransactionOperation.Deposit:
        case TransactionOperation.Payout:
          wallet.balance += amount
          break
        case TransactionOperation.Wage:
        case TransactionOperation.Withdraw:
          wallet.balance -= amount
          break
      }

      const transaction = {
        oldBalance,
        operation,
        amount,
        newBalance: wallet.balance,
        timestamp: new Date(),
      }

      wallet.transactions.push(transaction)
      return transaction
    },
  },

  persist: {
    key: 'wallet-store',
    storage: localStorage,
    paths: ['wallet'],
  } as any,
})
