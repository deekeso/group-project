<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import Navbar from '@/components/Navbar.vue'
import GameModesCard from '@/components/GameModesCard.vue'
import SloganSection from '@/components/SloganSection.vue'
import SigninForm from '@/components/SigninForm.vue'

// import { ElMessageBox } from 'element-plus'

// import userPointIcon from '@/assets/ChatGPT Image Apr 13, 2025, 11_51_57 AM - Copy.png'
// import classicKenoImg from '@/assets/classic.png'
// import miniKenoImg from '@/assets/mini.png'
// import heroBgImg from '@/assets/cvbcvnfgnfgnfg 19.png'

const router = useRouter()
const authStore = useAuthStore()

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})

// const handleLogout = async () => {
//   try {
//     await ElMessageBox.confirm('Are you sure you want to log out?', 'Confirm Logout', {
//       confirmButtonText: 'Yes, Log Out',
//       cancelButtonText: 'Cancel',
//       type: 'warning',
//     })

//     authStore.logout()
//     router.push('/login')
//   } catch {
//     // User cancelled logout
//   }
// }

const isSigninVisible = ref(false)

const showSigninModal = () => {
  isSigninVisible.value = true
}

const closeSigninModal = () => {
  isSigninVisible.value = false
}
</script>

<template>
  <div class="background">
    <div class="home">
      <Navbar />

      <div class="heading">
        <h1>Game Modes</h1>
      </div>
      <hr />
      <div class="gamemode-container">
        <GameModesCard @trigger-signin="showSigninModal" />
        <SloganSection />

        <el-dialog v-model="isSigninVisible" style="background-color: transparent" center>
          <SigninForm />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  width: 100%;
  justify-items: center;
}
.home {
  min-height: 100vh;
  width: 1216px;
  padding-top: 88px;
  margin-inline: 1rem;
  box-sizing: border-box;
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
  justify-content: center;
  margin-inline: 2rem;
}

::v-deep(.el-dialog__header) {
  display: none;
}
::v-deep(.el-dialocenter) {
  display: none;
}
</style>
