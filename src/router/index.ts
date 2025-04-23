import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/LoginForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
      meta: { layout: 'full' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/RegisterForm.vue'),
      meta: { layout: 'full' },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
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
      component: () => import('@/views/Wallet.vue'),
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
  ],
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires auth
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Redirect to login with return path
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }
  }

  // If trying to access login/register while authenticated
  if ((to.path === '/login' || to.path === '/register') && authStore.isAuthenticated) {
    next('/home')
    return
  }

  next()
})

export default router
