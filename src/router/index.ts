import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'landingpage',
      component: HomeView,
      meta: { layout: 'full' },
    },

    {
      path: '/mini-keno',
      name: 'mini',
      component: () => import('@/views/MiniView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('@/views/TheWallet.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/classic-keno',
      name: 'classic',
      component: () => import('@/views/ClassicView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/purchase-cards',
      name: 'purchase',
      component: () => import('@/views/PurchaseView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tutorial',
      name: 'tutorial',
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
next()
})
export default router
