import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import { GameMode, RouteName } from '@/types'
import { useGameStore } from '@/stores/useGameStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: RouteName.Home,
      component: HomeView,
      meta: { layout: 'full' },
    },
    {
      path: '/wallet',
      name: RouteName.Wallet,
      component: () => import('@/views/TheWallet.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/classic-keno',
      name: RouteName.ClassicGame,
      component: () => import('@/views/GameView.vue'),
      meta: {
        requiresAuth: true,
        gameMode: GameMode.Classic,
      },
    },
    {
      path: '/mini-keno',
      name: RouteName.MiniGame,
      component: () => import('@/views/GameView.vue'),
      meta: {
        requiresAuth: true,
        gameMode: GameMode.Mini,
      },
    },
    {
      path: '/tutorial',
      name: RouteName.Tutorial,
      component: () => import('@/views/TutorialView.vue'),
      meta: { requiresAuth: false },
    },
  ],
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  //   // Check if route requires auth
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      //       // Redirect to login with return path
      next({
        path: '/home',
        query: { redirect: to.fullPath },
      })
      return
    }
  }

  // Check if game
  if (
    ((from.name === RouteName.ClassicGame || from.name === RouteName.MiniGame) &&
      to.name === RouteName.Wallet) ||
    ((to.name === RouteName.ClassicGame || to.name === RouteName.MiniGame) &&
      from.name === RouteName.Wallet)
  ) {
    // alert("don't clear")
  } else {
    // alert('clear')
    useGameStore().resetGame()
  }

  next()
})
export default router
