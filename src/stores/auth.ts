/* eslint-disable @typescript-eslint/no-explicit-any */
import useUtils from '@/composables/useUtils'
import type { TransactionOperation, User, UserDetails } from '@/types.ts'
import { defineStore } from 'pinia'
import { useWalletsStore, type Wallet } from './wallet'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
    isAuthenticated: false
  }),

  actions: {
    login(email: string, password: string) {
      const foundUser = this.users.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error('Invalid email or password')
      }

      this.user = foundUser
      this.isAuthenticated = true
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
    },

    register(userData: UserDetails) {
      const { createWallet } = useWalletsStore()
      // Check for duplicate email
      if (this.users.some((u) => u.email === userData.email)) {
        throw new Error('Email already registered')
      }

      // Check for duplicate username
      if (this.users.some((u) => u.username === userData.username)) {
        throw new Error('Username already taken')
      }

      const newUser: User = {
        ...userData,
        wallet: createWallet()
      }

      this.users.push(newUser)
      this.user = newUser
      this.isAuthenticated = true
    },

    performTransaction(operation: TransactionOperation, amount: number) {
      const { performTransaction } = useWalletsStore()
      console.log(performTransaction(this.wallet.id, operation, amount))
    }
  },

  getters: {
    age(state) {
      if (!state.isAuthenticated || !state.user) throw new Error('User is not authenticated.')
      const { calculateAge } = useUtils()
      return calculateAge(state.user.dateOfBirth)
    },

    wallet(state): Wallet {
      const { findWallet } = useWalletsStore()
      if (!state.isAuthenticated || !state.user) throw new Error('User is not authenticated.')

      return findWallet(state.user.wallet)
    }
  },

  persist: {
    key: 'auth-store',
    storage: localStorage,
    paths: ['users', 'user', 'isAuthenticated'],
  } as any,
})
