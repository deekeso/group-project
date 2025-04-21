<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

import userPointIcon from '@/assets/ChatGPT Image Apr 13, 2025, 11_51_57 AM - Copy.png'
import classicKenoImg from '@/assets/classic.png'
import miniKenoImg from '@/assets/mini.png'
import heroBgImg from '@/assets/cvbcvnfgnfgnfg 19.png'

const router = useRouter()
const authStore = useAuthStore()

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('Are you sure you want to log out?', 'Confirm Logout', {
      confirmButtonText: 'Yes, Log Out',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })

    authStore.logout()
    router.push('/login')
  } catch {
    // User cancelled logout
  }
}
</script>

<template>
  <div class="home">
    <Navbar />

    <!-- Add logout button container -->
    <div class="logout-container">
      <el-button type="danger" @click="handleLogout" class="logout-btn"> Logout </el-button>
    </div>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Fast Picks, Big Wins!</h1>
        <div class="hero-text">
          <p>Welcome to Keno Plus — where the numbers move fast, and the wins come faster!</p>
          <p>
            Whether you're here for the classic thrill or a quick-hit game, Keno Plus lets you play
            your way.
          </p>
          <p>
            Choose Classic Keno with 80 numbers for a traditional experience full of suspense, or
            jump into Mini Keno with just 49 numbers for rapid rounds and instant action.
          </p>
          <p>
            It's simple, exciting, and built for players who love a good rush. Pick your numbers,
            feel the rush — and let the winning begin!
          </p>
        </div>
        <el-button class="learn-btn">Learn How to Play Keno Plus</el-button>
      </div>

      <div class="points-decoration">
        <img :src="userPointIcon" alt="Points Decoration" class="points-image" />
      </div>
    </div>

    <!-- Game Modes -->
    <div class="game-modes">
      <div class="game-mode classic">
        <h2>Classic Keno</h2>
        <div class="mode-content">
          <img :src="classicKenoImg" alt="Classic Keno" />
          <div class="mode-info">
            <p>Choose up to 15 numbers from a pool of 80</p>
            <p>Ideal for players who enjoy the classic casino feel and suspenseful draws.</p>
            <p>Bigger grids mean bigger payouts for the right picks.</p>
            <el-button type="primary" class="play-btn">Play</el-button>
          </div>
        </div>
      </div>

      <div class="game-mode mini">
        <h2>Mini Keno</h2>
        <div class="mode-content">
          <img :src="miniKenoImg" alt="Mini Keno" />
          <div class="mode-info">
            <p>Play with 49 numbers for faster results and faster fun.</p>
            <p>Perfect for quick breaks or rapid-fire play sessions.</p>
            <p>Smaller number pool means higher odds per pick.</p>
            <el-button type="primary" class="play-btn">Play</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  background: #05033d;
  min-height: 100vh;
  padding-top: 164px;
}

.hero-section {
  background: url('@/assets/cvbcvnfgnfgnfg 19.png') no-repeat center;
  background-size: cover;
  border-radius: 64px;
  margin: 20px;
  padding: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  box-shadow: inset 0px 0px 40px 6px rgba(255, 255, 255, 0.15);
}

.hero-content {
  max-width: 800px;
  color: white;
}

.header-row {
  margin-bottom: 24px;
}

.hero-title {
  font-size: 48px;
  color: #ffd700;
  margin-bottom: 24px;
}

.hero-text {
  margin-bottom: 32px;
}

.hero-text p {
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.6;
  color: white;
}

.learn-btn {
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}

.points-decoration {
  background: rgba(19, 0, 62, 0.8);
  padding: 20px;
  border-radius: 16px;
}

.points-image {
  width: auto;
  height: 200px;
  object-fit: contain;
}

.game-modes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
  margin-top: 40px;
}

.game-mode {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 32px;
}

.game-mode h2 {
  color: #ffd700;
  font-size: 36px;
  margin-bottom: 24px;
}

.mode-content {
  display: flex;
  gap: 32px;
}

.mode-content img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 16px;
}

.mode-info {
  color: white;
}

.mode-info p {
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.6;
}

.play-btn {
  margin-top: 24px;
  background: #ffd700;
  color: #05033d;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: bold;
}

.logout-container {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.logout-btn {
  height: 40px;
  padding: 0 24px;
  font-weight: bold;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .hero-section {
    flex-direction: column;
    gap: 40px;
  }

  .points-decoration {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 991px) {
  .game-modes {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .mode-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
