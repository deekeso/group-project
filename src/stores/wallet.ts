import { TransactionOperation } from '@/types'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useGameStore } from './useGameStore'

interface BaseTransaction {
  amount: number
  operation: TransactionOperation
  timestamp: Date
  metadata?: {
    gameMode?: string
    purchaseMode?: string
    numberOfCards?: number
  }
}

interface TransactionRecord extends BaseTransaction {
  oldBalance: number
  newBalance: number
  timestamp: Date
}

interface TransactionRecord extends BaseTransaction {
  oldBalance: number
  newBalance: number
}

export interface PendingTransaction extends BaseTransaction {
  walletId: string
}

export interface Wallet {
  id: string
  balance: number
  transactions: TransactionRecord[]
}

export const useWalletsStore = defineStore('wallets', {
  state: () => ({
    wallets: [] as Wallet[],
    pendingTransactions: [] as PendingTransaction[],
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

    performTransaction(
      id: string,
      operation: TransactionOperation,
      amount: number,
      timestamp?: Date,
    ): TransactionRecord {
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
      const gameStore = useGameStore()
      let transaction = {
        oldBalance,
        operation,
        amount,
        newBalance: wallet.balance,
        timestamp: new Date(),
      }

      wallet.transactions.push(transaction)
      return transaction
    },

    createPendingTransaction(amount: number, operation: TransactionOperation, walletId: string) {
      const foundWallet = this.wallets.find((wallet) => wallet.id === walletId)

      if (!foundWallet) {
        throw new Error('Wallet not found!')
      }

      const pendingTransaction: PendingTransaction = {
        amount,
        operation,
        walletId,
        timestamp: new Date(),
      }

      this.pendingTransactions.push(pendingTransaction)
    },

    commitPendingTransactions(walletId: string) {
      const transactionsForRemoval = [] as number[]

      const pendingTransactions = this.pendingTransactions.filter((pendingTransaction, index) => {
        if (pendingTransaction.walletId === walletId) {
          transactionsForRemoval.push(index)
          return true
        }
        return false
      })

      transactionsForRemoval.reverse().forEach((index) => {
        this.pendingTransactions.splice(index, 1)
      })

      pendingTransactions.forEach((pendingTransaction) => {
        this.performTransaction(
          pendingTransaction.walletId,
          pendingTransaction.operation,
          pendingTransaction.amount,
          pendingTransaction.timestamp,
        )
      })
    },
  },

  persist: {
    key: 'wallet-store',
    storage: localStorage,
  } as any,
})
