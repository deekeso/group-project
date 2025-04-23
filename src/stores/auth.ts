import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  email: string
  username?: string
  dateOfBirth?: Date
  password: string
  balance?: number
}

export const useAuthStore = defineStore('auth', () => {
  const users = ref<User[]>([])
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  function login(email: string, password: string) {
    const foundUser = users.value.find(
      u => u.email === email && u.password === password
    )

    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    user.value = foundUser
    isAuthenticated.value = true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  function register(userData: User) {
    // Check for duplicate email
    if (users.value.some(u => u.email === userData.email)) {
      throw new Error('Email already registered')
    }

    // Check for duplicate username
    if (users.value.some(u => u.username === userData.username)) {
      throw new Error('Username already taken')
    }

    users.value.push({...userData, balance: 0})
    user.value = {...userData, balance: 0}
    isAuthenticated.value = true
  }

  return {
    user,
    users,
    isAuthenticated,
    login,
    logout,
    register
  }
}, {
  persist: {
    key: 'auth-store',
    storage: localStorage,
    paths: ['users', 'user', 'isAuthenticated']
  }
})
