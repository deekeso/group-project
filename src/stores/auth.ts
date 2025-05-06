/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, UserDetails } from '@/types.ts'
import { User } from '@element-plus/icons-vue'
import useUtils from '@/composables/useUtils'

// () => {
//   const users = ref<User[]>([])
//   const user = ref<User | null>(null)
//   const isAuthenticated = ref(false)

//   function login(email: string, password: string) {
//     const foundUser = users.value.find((u) => u.email === email && u.password === password)

//     if (!foundUser) {
//       throw new Error('Invalid email or password')
//     }

//     user.value = foundUser
//     isAuthenticated.value = true
//   }

//   function logout() {
//     user.value = null
//     isAuthenticated.value = false
//   }

//   function register(userData: User) {
//     // Check for duplicate email
//     if (users.value.some((u) => u.email === userData.email)) {
//       throw new Error('Email already registered')
//     }

//     // Check for duplicate username
//     if (users.value.some((u) => u.username === userData.username)) {
//       throw new Error('Username already taken')
//     }

//     users.value.push({ ...userData, balance: 0 })
//     user.value = { ...userData, balance: 0 }
//     isAuthenticated.value = true
//   }

//   return {
//     user,
//     users,
//     isAuthenticated,
//     login,
//     logout,
//     register,
//   }
// },

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
    isAuthenticated: false,
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
        balance: 0
      }

      this.users.push(newUser)
      this.user = newUser
      this.isAuthenticated = true
    },
  },

  getters: {
    age(state) {
      if (!state.isAuthenticated || !state.user) throw new Error('User is not authenticated.')
      const { calculateAge } = useUtils()
      return calculateAge(state.user.dateOfBirth)
    }
  },

  persist: {
    key: 'auth-store',
    storage: localStorage,
    paths: ['users', 'user', 'isAuthenticated'],
  } as any,
})
