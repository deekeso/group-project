<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import GameModesCard from '@/components/GameModesCard.vue'

import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { CaretRight } from '@element-plus/icons-vue'

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
    <div class="heading">
      <h1>Game Modes</h1>
    </div>
    <hr />
    <div class="gamemode-container">
      <GameModesCard />
      <div class="slogan">
        <div class="slogan-heading">
          <h1>Fast Picks, Big Wins!</h1>
        </div>
        <div class="slogan-body">
          <p>
            Keno Plus offers fast-paced excitement with Classic and Mini Keno options, letting you
            choose between suspenseful 80-number draws or quick 49-number rounds — all designed for
            thrilling, customizable play.
          </p>
          <div class="tutorial-btn">
            <el-button>
              <el-icon :size="32"><CaretRight class="Icon" /></el-icon>
              Learn How to Play Keno</el-button
            >
          </div>
          <div class="keno-img">
            <img src="../assets/KenoPlay.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  padding-top: 88px;
}
.heading {
  font-family: 'Grandstander', sans-serif;
  font-variation-settings: 'wght' 700;
  font-size: 18px;
  color: #fcd119;
  text-shadow: 3px 3px 12px #bc4615;
}
.gamemode-container {
  display: flex;
}
.slogan-heading {
  font-family: 'Grandstander', sans-serif;
  font-size: 18px;
  font-variation-settings: 'wght' 700;

  margin-top: 24px;

  color: #fcd119;
  text-shadow: 3px 3px 12px #bc4615;

  text-align: end;
}
.slogan-body {
  font-family: Inter, sans-serif;
  font-size: 14px;
  text-align: end;
  margin-left: 20px;
  color: #f8f8f8;
}
.tutorial-btn .el-button {
  margin-top: 40px;
  background-color: #f8ab00;
  border-radius: 30px;
  height: 48px;
  width: 300px;
  color: #060351;
  border: none;
  font-family: Inter, sans-serif;
  font-variation-settings: 'wght' 700;
  font-size: 14px;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
}

.tutorial-btn .Icon {
  color: #060351;
  margin-right: 14px;
}
.keno-img img {
  width: 408px;
  align-items: end;
  margin-top: 120px;
}
</style>
